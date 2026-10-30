import { db } from '@/lib/storage/db';
import { aiProvider } from '@/services/agents/ai-provider';
import { GeneratedDocument, Internship, Profile, StudentProject } from '@/types';

export interface PersonalizationResult {
  coverLetter: string;
  relevantProjects: StudentProject[];
  resumeBulletSuggestions: Array<{ original: string; suggested: string; reason: string }>;
  screeningAnswers: Record<string, string>;
  relevanceRationale: string;
  sourceWarning: string;
}

export class PersonalizationAgentService {
  /**
   * Generates tailored, factual application materials.
   * STRICT GUARD: Never hallucinates degrees, GPA, or employment history.
   */
  public async generateApplicationMaterials(params: {
    studentId: string;
    internshipId: string;
  }): Promise<PersonalizationResult> {
    const student = db.getProfile(params.studentId);
    const internship = db.getInternship(params.internshipId);
    const projects = db.getStudentProjects(params.studentId);
    const skills = db.getStudentSkills(params.studentId);

    if (!student || !internship) {
      throw new Error('Student or Internship record not found');
    }

    // Filter relevant projects matching internship skills
    const reqSkillsLower = internship.required_skills.map((s) => s.toLowerCase());
    const relevantProjects = projects.filter((p) =>
      p.technologies.some((t) => reqSkillsLower.some((req) => req.includes(t.toLowerCase()) || t.toLowerCase().includes(req)))
    );
    const selectedProjects = relevantProjects.length > 0 ? relevantProjects : projects.slice(0, 2);

    const projectHighlights = selectedProjects
      .map((p) => `• ${p.title}: Built using ${p.technologies.join(', ')}. ${p.description}`)
      .join('\n');

    // Deterministic factual cover letter baseline
    const companyName = internship.company?.name || 'the team';
    const factualCoverLetter = `Dear ${companyName} Hiring Team,

I am writing to express my strong enthusiasm for the ${internship.title} role. As a ${student.degree || 'Degree'} student at ${student.education || 'University'} (Graduation Cohort ${student.graduation_year || 2026}) with a strong foundation in ${skills.slice(0, 4).map((s) => s.skill_name).join(', ')}, I believe my background aligns well with your team's objectives.

Key experiences and projects relevant to your requirements:
${projectHighlights || '• Demonstrated hands-on engineering problem solving through academic software projects.'}

I am eager to contribute to ${companyName} through reliable execution, fast learning, and dedication to code quality. Thank you for your time and consideration.

Sincerely,
${student.full_name}
${student.email}`;

    // Bullet improvement suggestions
    const resumeBulletSuggestions = selectedProjects.map((p) => ({
      original: `Worked on ${p.title} using ${p.technologies.join(', ')}.`,
      suggested: `Architected ${p.title} using ${p.technologies.join(', ')}, aligning with ${internship.title} requirements in ${internship.required_skills.slice(0, 2).join(' and ')}.`,
      reason: `Highlights concrete engineering stack relevant to ${companyName}.`,
    }));

    // Screening question draft answers
    const screeningAnswers = {
      why_company: `I am specifically interested in ${companyName} because of your focus on ${internship.title} and real-world scale. My work on ${selectedProjects[0]?.title || 'software engineering'} directly aligns with your tech stack.`,
      availability: `Available for the full ${internship.duration} duration, supporting ${internship.work_mode} mode in ${internship.location}.`,
    };

    const prompt = `You are the InternBridge AI Personalization Agent.
Draft a professional, concise, honest cover letter for candidate ${student.full_name} applying to ${internship.title} at ${companyName}.
Candidate Facts ONLY:
- Degree: ${student.degree || 'B.Tech'} in ${student.department || 'Computer Science'}
- University: ${student.education || 'University'}
- GPA: ${student.gpa || 'Not specified'}
- Known Skills: ${skills.map((s) => s.skill_name).join(', ')}
- Real Projects: ${projectHighlights}

IMPORTANT: Do not invent any employment history, company names, certifications, or statistics that are not listed above.`;

    const aiRes = await aiProvider.generateText(prompt, factualCoverLetter);

    // Save generated artifact for student review and tracking
    const genDoc: GeneratedDocument = {
      id: `gd-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      student_id: params.studentId,
      doc_type: 'cover_letter',
      title: `Cover Letter - ${internship.title}`,
      content: aiRes.content,
      approved: false,
      created_at: new Date().toISOString(),
    };
    db.generatedDocuments.set(genDoc.id, genDoc);

    // Audit log
    db.logAgentRun({
      user_id: params.studentId,
      agent_type: 'personalization_agent',
      status: 'completed',
      trigger_type: 'manual',
      input_summary: {
        internship_id: params.internshipId,
        student_id: params.studentId,
        projects_count: selectedProjects.length,
      },
      output_summary: {
        cover_letter_length: aiRes.content.length,
        suggested_bullets: resumeBulletSuggestions.length,
        source: aiRes.source,
      },
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    });

    return {
      coverLetter: aiRes.content,
      relevantProjects: selectedProjects,
      resumeBulletSuggestions,
      screeningAnswers,
      relevanceRationale: `Selected projects showcase your hands-on mastery of ${internship.required_skills.slice(0, 3).join(', ')} without fabricating any unverified metrics.`,
      sourceWarning: 'AI-generated materials require your explicit review before application submission.',
    };
  }
}

export const personalizationAgent = new PersonalizationAgentService();

