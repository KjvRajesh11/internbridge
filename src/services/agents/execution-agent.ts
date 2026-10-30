import { db } from '@/lib/storage/db';
import { guardAgent } from '@/services/agents/guard-agent';
import { hunterAgent } from '@/services/agents/hunter-agent';
import { Application } from '@/types';

export interface ExecutionResult {
  success: boolean;
  applicationId?: string;
  application?: Application;
  mode: 'assisted' | 'autonomous_auto_apply';
  reasons?: string[];
  message: string;
}

export class ExecutionAgentService {
  /**
   * Executes an authorized application submission for an internal InternBridge internship.
   * Performs end-to-end verification via Agent 4 (Guard).
   */
  public async submitApplication(params: {
    studentId: string;
    internshipId: string;
    mode: 'assisted' | 'autonomous_auto_apply';
    coverLetter?: string;
    answers?: Record<string, string>;
  }): Promise<ExecutionResult> {
    const isAuto = params.mode === 'autonomous_auto_apply';

    // 1. Run deterministic Guard check (Hard eligibility, open listing, deadline, duplicate check)
    const guardResult = guardAgent.evaluateEligibility({
      studentId: params.studentId,
      internshipId: params.internshipId,
      isAutoApply: isAuto,
    });

    if (!guardResult.passed) {
      // Log failure in agent runs
      db.logAgentRun({
        user_id: params.studentId,
        agent_type: 'execution_agent',
        status: 'failed',
        trigger_type: isAuto ? 'auto' : 'manual',
        input_summary: {
          internship_id: params.internshipId,
          mode: params.mode,
        },
        output_summary: {
          success: false,
          reasons: guardResult.failureReasons,
        },
        error_message: guardResult.failureReasons.join('; '),
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      });

      return {
        success: false,
        mode: params.mode,
        reasons: guardResult.failureReasons,
        message: `Application submission blocked: ${guardResult.failureReasons[0]}`,
      };
    }

    // 2. Retrieve student documents and match analysis
    const student = db.getProfile(params.studentId);
    const internship = db.getInternship(params.internshipId);
    if (!student || !internship) {
      return {
        success: false,
        mode: params.mode,
        message: 'Could not resolve candidate or internship record.',
      };
    }

    const docs = db.getStudentDocuments(params.studentId);
    const primaryResume = docs.find((d) => d.is_primary) || docs[0];
    const matchAnalysis = hunterAgent.calculateMatch(student, internship);

    // If auto-apply, check match threshold from student preferences
    if (isAuto) {
      const prefs = db.getStudentPreferences(params.studentId);
      const threshold = prefs?.auto_apply_settings?.match_threshold ?? 80;
      if (matchAnalysis.compatibility_score < threshold) {
        return {
          success: false,
          mode: params.mode,
          message: `Compatibility score (${matchAnalysis.compatibility_score}%) is below your auto-apply threshold (${threshold}%).`,
        };
      }
    }

    try {
      // 3. Persist application with atomic DB uniqueness constraint check
      const application = db.createApplication({
        student_id: params.studentId,
        internship_id: params.internshipId,
        resume_url: primaryResume?.file_url || 'https://storage.internbridge.internal/resumes/default_resume.pdf',
        answers: params.answers || { why_company: 'Applied via InternBridge AI Agent Workflow' },
        cover_letter: params.coverLetter || 'Application submitted via InternBridge.',
        match_score: matchAnalysis.compatibility_score,
        match_analysis: matchAnalysis,
      });

      // 4. Log successful execution run
      db.logAgentRun({
        user_id: params.studentId,
        agent_type: 'execution_agent',
        status: 'completed',
        trigger_type: isAuto ? 'auto' : 'manual',
        input_summary: {
          internship_id: params.internshipId,
          mode: params.mode,
          match_score: matchAnalysis.compatibility_score,
        },
        output_summary: {
          success: true,
          application_id: application.id,
          status: application.status,
        },
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      });

      return {
        success: true,
        applicationId: application.id,
        application,
        mode: params.mode,
        message: 'Application recorded and delivered to recruiter pipeline successfully.',
      };
    } catch (err: any) {
      return {
        success: false,
        mode: params.mode,
        reasons: [err.message],
        message: err.message || 'Database error occurred during application insertion.',
      };
    }
  }

  /**
   * Run auto-apply sweep for a student across all eligible open internships.
   */
  public async runAutoApplyCycle(studentId: string): Promise<{
    processed: number;
    submitted: number;
    skipped: number;
    results: ExecutionResult[];
  }> {
    const student = db.getProfile(studentId);
    const prefs = db.getStudentPreferences(studentId);

    if (!student || !prefs?.auto_apply_enabled) {
      return { processed: 0, submitted: 0, skipped: 0, results: [] };
    }

    const openInternships = db.getInternships({ status: 'published' });
    const results: ExecutionResult[] = [];
    let submittedCount = 0;
    const weeklyLimit = prefs.auto_apply_settings?.max_weekly_apps || 5;

    for (const internship of openInternships) {
      if (submittedCount >= weeklyLimit) break;

      // Skip if already applied
      if (db.hasApplied(studentId, internship.id)) continue;

      const res = await this.submitApplication({
        studentId,
        internshipId: internship.id,
        mode: 'autonomous_auto_apply',
        coverLetter: `Autonomous application generated for ${internship.title} via student pre-authorized auto-apply workflow.`,
      });

      results.push(res);
      if (res.success) {
        submittedCount++;
      }
    }

    return {
      processed: openInternships.length,
      submitted: submittedCount,
      skipped: openInternships.length - submittedCount,
      results,
    };
  }
}

export const executionAgent = new ExecutionAgentService();

