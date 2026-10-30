import { db } from '@/lib/storage/db';
import { aiProvider } from '@/services/agents/ai-provider';
import { Application, ApplicationStatus, Interview } from '@/types';

export interface StageDwellAnalysis {
  applicationId: string;
  currentStatus: ApplicationStatus;
  daysInCurrentStage: number;
  exceedsReviewTarget: boolean;
  recommendedAction: string;
  nextSteps: string[];
}

export interface InterviewPrepSheet {
  internshipTitle: string;
  companyName: string;
  technicalQuestions: Array<{ topic: string; question: string; idealAnswerPoints: string[] }>;
  behavioralQuestions: Array<{ question: string; framework: string; suggestedPoints: string[] }>;
  projectDiscussionTopics: Array<{ project: string; focusArea: string; samplePrompt: string }>;
  revisionChecklist: string[];
  tipsForSuccess: string[];
}

export class CareerOpsAgentService {
  /**
   * Evaluates post-submission dwell time and provides next action guidance.
   */
  public analyzeApplicationDwellTime(applicationId: string): StageDwellAnalysis {
    const app = db.getApplication(applicationId);
    if (!app) throw new Error('Application not found');

    const history = db.getApplicationStatusHistory(applicationId);
    const lastChange = history.length > 0 ? history[history.length - 1].change_timestamp : app.submission_timestamp;

    const daysInCurrentStage = Math.max(
      0,
      Math.floor((Date.now() - new Date(lastChange).getTime()) / (1000 * 60 * 60 * 24))
    );

    // Flag if in 'applied' or 'under_review' for more than 7 days
    const exceedsReviewTarget =
      (app.status === 'applied' || app.status === 'under_review') && daysInCurrentStage >= 7;

    let recommendedAction = 'No action required. Review timeline is normal.';
    const nextSteps: string[] = [];

    switch (app.status) {
      case 'applied':
        nextSteps.push('Recruiter screening queue awaiting resume review.');
        nextSteps.push('Review your portfolio projects to ensure live demo URLs are reachable.');
        if (exceedsReviewTarget) {
          recommendedAction = 'Send a polite follow-up message expressing continued enthusiasm.';
        }
        break;
      case 'under_review':
        nextSteps.push('Hiring manager evaluating technical qualification match.');
        nextSteps.push('Prepare for potential interview scheduling notifications.');
        break;
      case 'shortlisted':
        recommendedAction = 'Expect interview invitation soon. Begin AI Interview Prep.';
        nextSteps.push('Recruiter has shortlisted your profile.');
        nextSteps.push('Check your notifications and interview calendar daily.');
        break;
      case 'interview_scheduled':
        recommendedAction = 'Use the AI Interview Preparation Workspace to rehearse technical & behavioral questions.';
        nextSteps.push('Confirm meeting link and audio/video setup.');
        nextSteps.push('Review company background and core responsibilities.');
        break;
      case 'selected':
        recommendedAction = 'Offer stage reached. Review joining instructions.';
        nextSteps.push('Review formal offer letter and internship dates.');
        break;
      case 'rejected':
        recommendedAction = 'Request constructive feedback or explore other active matches via Autonomous Hunter.';
        nextSteps.push('Re-evaluate missing skills from match analysis for future growth.');
        break;
      case 'withdrawn':
        recommendedAction = 'Application is closed.';
        break;
    }

    return {
      applicationId,
      currentStatus: app.status,
      daysInCurrentStage,
      exceedsReviewTarget,
      recommendedAction,
      nextSteps,
    };
  }

  /**
   * Generates a professional follow-up message draft for an application.
   */
  public async generateFollowUpMessage(applicationId: string): Promise<string> {
    const app = db.getApplication(applicationId);
    if (!app) throw new Error('Application not found');

    const student = db.getProfile(app.student_id);
    const internship = db.getInternship(app.internship_id);
    const company = internship?.company?.name || 'the team';

    const fallback = `Subject: Following up on ${internship?.title || 'Internship'} Application - ${student?.full_name || 'Candidate'}

Dear ${company} Recruitment Team,

I hope you are having a productive week.

I am writing to respectfully follow up on my application for the ${internship?.title || 'internship'} position submitted on ${new Date(
      app.submission_timestamp
    ).toLocaleDateString()}.

I remain very excited about the opportunity to contribute to ${company}, especially given my background in ${internship?.required_skills.slice(0, 3).join(', ') || 'software engineering'}. Please let me know if any additional documentation or technical samples would be helpful as you review candidate profiles.

Thank you once again for your time and consideration.

Best regards,
${student?.full_name || 'Candidate'}
${student?.email || ''}`;

    const prompt = `Draft a polite, professional 3-sentence follow-up email from candidate ${student?.full_name} to ${company} for the ${internship?.title} role.`;
    const res = await aiProvider.generateText(prompt, fallback);
    return res.content;
  }

  /**
   * Generates tailored interview preparation materials based on real skills, projects, and role.
   */
  public async generateInterviewPrepSheet(params: {
    studentId: string;
    internshipId: string;
  }): Promise<InterviewPrepSheet> {
    const student = db.getProfile(params.studentId);
    const internship = db.getInternship(params.internshipId);
    const projects = db.getStudentProjects(params.studentId);

    if (!student || !internship) throw new Error('Student or Internship not found');

    const skills = internship.required_skills;
    const companyName = internship.company?.name || 'Company';

    // Tailored technical questions based on required skills
    const technicalQuestions = skills.slice(0, 4).map((skill) => ({
      topic: skill,
      question: `How would you utilize ${skill} to design a robust, testable service in the context of ${internship.title}?`,
      idealAnswerPoints: [
        `Explain foundational architectural principles of ${skill}.`,
        'Discuss concurrency, caching, or memory management considerations.',
        'Reference unit testing and automated integration benchmarks.',
      ],
    }));

    // Behavioral questions
    const behavioralQuestions = [
      {
        question: 'Describe a challenging engineering bug or roadblock you encountered in a project and how you diagnosed it.',
        framework: 'STAR (Situation, Task, Action, Result)',
        suggestedPoints: [
          'State the root cause clearly without deflecting responsibility.',
          'Describe the debugging methodology (logging, profiling, git bisect).',
          'Quantify the outcome and preventative measures added.',
        ],
      },
      {
        question: `Why are you interested in joining ${companyName} for this internship?`,
        framework: 'Motivation & Role Alignment',
        suggestedPoints: [
          `Connect your career goals directly to ${companyName}'s domain (${internship.company?.industry || 'Technology'}).`,
          `Highlight the specific responsibilities from the job description: ${internship.responsibilities.slice(0, 100)}...`,
        ],
      },
    ];

    // Project discussion topics based on student's actual projects
    const projectDiscussionTopics = projects.map((p) => ({
      project: p.title,
      focusArea: `Architectural decisions using ${p.technologies.join(', ')}`,
      samplePrompt: `Walk me through the design tradeoffs you made while building ${p.title}. Why did you choose ${p.technologies[0]} over alternatives?`,
    }));

    const revisionChecklist = [
      `Review core data structures and Big-O complexity for algorithms.`,
      `Brush up on ${skills.join(', ')} syntax, idioms, and standard libraries.`,
      'Prepare 2-3 thoughtful questions for the interviewer regarding team workflows.',
      'Test your webcam, microphone, and stable internet connection 15 minutes before the call.',
    ];

    const tipsForSuccess = [
      'Speak your thought process aloud before writing code.',
      'Clarify edge cases and input boundaries before jumping to conclusions.',
      'Be honest about what you know and demonstrate eagerness to learn.',
    ];

    // Audit log
    db.logAgentRun({
      user_id: params.studentId,
      agent_type: 'career_ops_agent',
      status: 'completed',
      trigger_type: 'manual',
      input_summary: { internship_id: params.internshipId, student_id: params.studentId },
      output_summary: {
        technical_questions: technicalQuestions.length,
        behavioral_questions: behavioralQuestions.length,
        project_topics: projectDiscussionTopics.length,
      },
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    });

    return {
      internshipTitle: internship.title,
      companyName,
      technicalQuestions,
      behavioralQuestions,
      projectDiscussionTopics,
      revisionChecklist,
      tipsForSuccess,
    };
  }

  /**
   * Evaluates student's practice response in a mock interview scenario.
   */
  public async evaluateMockAnswer(params: {
    question: string;
    studentAnswer: string;
  }): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
    const wordCount = params.studentAnswer.trim().split(/\s+/).length;
    let score = 7;
    const strengths: string[] = [];
    const improvements: string[] = [];

    if (wordCount > 30) {
      strengths.push('Provided a comprehensive answer with sufficient detail.');
      score += 1;
    } else {
      improvements.push('Answer was concise; consider elaborating with concrete project examples.');
      score -= 1;
    }

    if (params.studentAnswer.toLowerCase().includes('result') || params.studentAnswer.toLowerCase().includes('because')) {
      strengths.push('Good cause-and-effect reasoning demonstrated.');
      score += 1;
    } else {
      improvements.push('Incorporate measurable outcomes or results where possible.');
    }

    score = Math.min(10, Math.max(1, score));

    const feedback = `Your response scores ${score}/10. ${
      score >= 8 ? 'Strong articulation and clear technical reasoning.' : 'Good foundation, with room for structured STAR framework storytelling.'
    }`;

    return {
      score,
      feedback,
      strengths,
      improvements,
    };
  }
}

export const careerOpsAgent = new CareerOpsAgentService();

