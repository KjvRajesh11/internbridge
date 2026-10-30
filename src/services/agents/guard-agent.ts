import { db } from '@/lib/storage/db';
import { Internship, Profile, StudentPreferences } from '@/types';

export interface GuardCheckResult {
  passed: boolean;
  checks: {
    internship_published: boolean;
    deadline_valid: boolean;
    no_duplicate_application: boolean;
    gpa_eligible: boolean;
    grad_year_eligible: boolean;
    degree_eligible: boolean;
    permissions_valid: boolean;
    documents_ready: boolean;
  };
  failureReasons: string[];
  explanation: string;
}

export class GuardAgentService {
  /**
   * Deterministically validates all application eligibility and integrity rules.
   * This logic CANNOT be overridden by an AI model.
   */
  public evaluateEligibility(params: {
    studentId: string;
    internshipId: string;
    isAutoApply?: boolean;
  }): GuardCheckResult {
    const student = db.getProfile(params.studentId);
    const internship = db.getInternship(params.internshipId);
    const preferences = db.getStudentPreferences(params.studentId);
    const studentDocs = db.getStudentDocuments(params.studentId);

    const failureReasons: string[] = [];

    if (!student) {
      return {
        passed: false,
        checks: {
          internship_published: false,
          deadline_valid: false,
          no_duplicate_application: false,
          gpa_eligible: false,
          grad_year_eligible: false,
          degree_eligible: false,
          permissions_valid: false,
          documents_ready: false,
        },
        failureReasons: ['Student profile not found.'],
        explanation: 'The student profile could not be retrieved from the database.',
      };
    }

    if (!internship) {
      return {
        passed: false,
        checks: {
          internship_published: false,
          deadline_valid: false,
          no_duplicate_application: false,
          gpa_eligible: false,
          grad_year_eligible: false,
          degree_eligible: false,
          permissions_valid: false,
          documents_ready: false,
        },
        failureReasons: ['Internship not found.'],
        explanation: 'The requested internship listing does not exist.',
      };
    }

    // 1. Internship Published Check
    const internshipPublished = internship.status === 'published';
    if (!internshipPublished) {
      failureReasons.push(`Internship is currently ${internship.status} and not accepting applications.`);
    }

    // 2. Deadline Check
    const deadline = new Date(internship.application_deadline);
    const deadlineValid = deadline.getTime() > Date.now();
    if (!deadlineValid) {
      failureReasons.push(`Application deadline expired on ${deadline.toLocaleDateString()}.`);
    }

    // 3. MANDATORY DUPLICATE CHECK: A student cannot apply to the same internship more than once
    const hasExistingApplication = db.hasApplied(params.studentId, params.internshipId);
    const noDuplicateApplication = !hasExistingApplication;
    if (!noDuplicateApplication) {
      failureReasons.push('You have already applied for this internship. Open your existing application to track its progress.');
    }

    // 4. GPA Eligibility Check
    let gpaEligible = true;
    if (internship.minimum_gpa && internship.minimum_gpa > 0) {
      if (!student.gpa || student.gpa < internship.minimum_gpa) {
        gpaEligible = false;
        failureReasons.push(
          `Minimum GPA requirement is ${internship.minimum_gpa}. Your profile records ${student.gpa ?? 'not provided'}.`
        );
      }
    }

    // 5. Graduation Year Eligibility Check
    let gradYearEligible = true;
    if (internship.accepted_graduation_years && internship.accepted_graduation_years.length > 0) {
      if (!student.graduation_year || !internship.accepted_graduation_years.includes(student.graduation_year)) {
        gradYearEligible = false;
        failureReasons.push(
          `Accepted graduation years: ${internship.accepted_graduation_years.join(', ')}. Your profile records ${
            student.graduation_year ?? 'not provided'
          }.`
        );
      }
    }

    // 6. Degree Eligibility Check
    let degreeEligible = true;
    const allowedDegrees = internship.eligibility_rules?.allowed_degrees;
    if (allowedDegrees && allowedDegrees.length > 0) {
      if (!student.degree || !allowedDegrees.includes(student.degree)) {
        degreeEligible = false;
        failureReasons.push(
          `Eligible degrees: ${allowedDegrees.join(', ')}. Your profile lists ${student.degree ?? 'not provided'}.`
        );
      }
    }

    // 7. Auto-Apply Permissions Check (if executing under auto-apply mode)
    let permissionsValid = true;
    if (params.isAutoApply) {
      if (!preferences?.auto_apply_enabled) {
        permissionsValid = false;
        failureReasons.push('Autonomous Auto-Apply is disabled in your student preferences.');
      }
    }

    // 8. Documents Ready Check
    const documentsReady = studentDocs.length > 0 || Boolean(student.professional_summary);

    const passed =
      internshipPublished &&
      deadlineValid &&
      noDuplicateApplication &&
      gpaEligible &&
      gradYearEligible &&
      degreeEligible &&
      permissionsValid;

    let explanation = '';
    if (passed) {
      explanation = `All eligibility and integrity checks passed. You meet the GPA (${internship.minimum_gpa || 'None'}), cohort (${
        internship.accepted_graduation_years?.join(', ') || 'Any'
      }), and degree requirements with no prior applications on record.`;
    } else {
      explanation = `Application blocked by Integrity Guard:\n• ${failureReasons.join('\n• ')}`;
    }

    // Audit log
    db.logAgentRun({
      user_id: params.studentId,
      agent_type: 'guard_agent',
      status: 'completed',
      trigger_type: params.isAutoApply ? 'auto' : 'manual',
      input_summary: {
        internship_id: params.internshipId,
        student_id: params.studentId,
        isAutoApply: params.isAutoApply,
      },
      output_summary: {
        passed,
        checks: {
          internshipPublished,
          deadlineValid,
          noDuplicateApplication,
          gpaEligible,
          gradYearEligible,
          degreeEligible,
          permissionsValid,
        },
        failureReasons,
      },
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    });

    return {
      passed,
      checks: {
        internship_published: internshipPublished,
        deadline_valid: deadlineValid,
        no_duplicate_application: noDuplicateApplication,
        gpa_eligible: gpaEligible,
        grad_year_eligible: gradYearEligible,
        degree_eligible: degreeEligible,
        permissions_valid: permissionsValid,
        documents_ready: documentsReady,
      },
      failureReasons,
      explanation,
    };
  }
}

export const guardAgent = new GuardAgentService();

