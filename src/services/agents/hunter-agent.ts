import { db } from '@/lib/storage/db';
import { guardAgent } from '@/services/agents/guard-agent';
import { aiProvider } from '@/services/agents/ai-provider';
import { Internship, MatchAnalysis, Profile } from '@/types';

export interface HunterRecommendation {
  internship: Internship;
  matchAnalysis: MatchAnalysis;
  aiExplanation?: string;
  hasApplied: boolean;
}

export class HunterAgentService {
  /**
   * Deterministic weighted matching algorithm:
   * Required skill alignment: 40%
   * Preferred skill alignment: 20%
   * Role and interest alignment: 15%
   * Educational alignment: 10%
   * Location and work-mode alignment: 10%
   * Duration and availability alignment: 5%
   */
  public calculateMatch(student: Profile, internship: Internship): MatchAnalysis {
    const studentSkills = db.getStudentSkills(student.id).map((s) => s.skill_name.toLowerCase());
    // Also consider technologies demonstrated in student projects
    const projectTechs = db
      .getStudentProjects(student.id)
      .flatMap((p) => p.technologies)
      .map((t) => t.toLowerCase());
    const allKnownSkills = Array.from(new Set([...studentSkills, ...projectTechs]));

    const preferences = db.getStudentPreferences(student.id);

    // 1. Required Skills Alignment (40%)
    const reqSkills = internship.required_skills.map((s) => s.toLowerCase());
    const matchingReq = reqSkills.filter((s) => allKnownSkills.some((ss) => ss.includes(s) || s.includes(ss)));
    const reqScore = reqSkills.length > 0 ? (matchingReq.length / reqSkills.length) * 40 : 40;

    // 2. Preferred Skills Alignment (20%)
    const prefSkills = internship.preferred_skills.map((s) => s.toLowerCase());
    const matchingPref = prefSkills.filter((s) => allKnownSkills.some((ss) => ss.includes(s) || s.includes(ss)));
    const prefScore = prefSkills.length > 0 ? (matchingPref.length / prefSkills.length) * 20 : 15;

    // 3. Role & Interest Alignment (15%)
    let roleScore = 5;
    const targetRoles = preferences?.target_roles?.map((r) => r.toLowerCase()) || [];
    const titleLower = internship.title.toLowerCase();
    const descLower = internship.description.toLowerCase();

    // Check partial string matching or keyword overlap
    const hasRoleMatch = targetRoles.some((r) => {
      if (titleLower.includes(r) || descLower.includes(r)) return true;
      const tokens = r.split(/\s+/);
      return tokens.filter((t) => t.length > 3).some((t) => titleLower.includes(t) || descLower.includes(t));
    });

    if (hasRoleMatch) {
      roleScore = 15;
    } else if (targetRoles.length === 0) {
      roleScore = 10;
    }

    // 4. Educational Alignment (10%)
    let eduScore = 10;
    if (internship.minimum_gpa && student.gpa) {
      if (student.gpa < internship.minimum_gpa) {
        eduScore -= 5;
      }
    }
    if (internship.accepted_graduation_years?.length && student.graduation_year) {
      if (!internship.accepted_graduation_years.includes(student.graduation_year)) {
        eduScore -= 5;
      }
    }
    eduScore = Math.max(0, eduScore);

    // 5. Location and Work-Mode Alignment (10%)
    let locScore = 5;
    const prefModes = preferences?.work_mode_preference || [];
    if (prefModes.includes(internship.work_mode) || internship.work_mode === 'remote') {
      locScore += 3;
    }
    const prefLocs = preferences?.preferred_locations?.map((l) => l.toLowerCase()) || [];
    if (prefLocs.some((l) => internship.location.toLowerCase().includes(l))) {
      locScore += 2;
    }
    locScore = Math.min(10, locScore);

    // 6. Duration & Availability Alignment (5%)
    const durScore = 5;

    // Total Compatibility Score
    const totalScore = Math.min(100, Math.round((reqScore + prefScore + roleScore + eduScore + locScore + durScore) * 10) / 10);

    // Identify matching & missing required skills (preserving original casing from internship)
    const matchingSkillsList = internship.required_skills.filter((s) =>
      studentSkills.some((ss) => ss.includes(s.toLowerCase()) || s.toLowerCase().includes(ss))
    );
    const missingSkillsList = internship.required_skills.filter(
      (s) => !studentSkills.some((ss) => ss.includes(s.toLowerCase()) || s.toLowerCase().includes(ss))
    );

    // Hard eligibility evaluation via Guard Agent
    const guardResult = guardAgent.evaluateEligibility({
      studentId: student.id,
      internshipId: internship.id,
    });

    const reasons: string[] = [];
    if (matchingSkillsList.length > 0) {
      reasons.push(`Strong overlap with core required skills: ${matchingSkillsList.slice(0, 3).join(', ')}.`);
    }
    if (student.gpa && internship.minimum_gpa && student.gpa >= internship.minimum_gpa) {
      reasons.push(`Your GPA (${student.gpa}) satisfies the academic baseline (${internship.minimum_gpa}).`);
    }
    if (internship.work_mode === 'remote' || (preferences?.work_mode_preference && preferences.work_mode_preference.includes(internship.work_mode))) {
      reasons.push(`Work mode (${internship.work_mode}) matches your career preferences.`);
    }

    return {
      compatibility_score: totalScore,
      matching_skills: matchingSkillsList,
      missing_skills: missingSkillsList,
      eligibility_passed: guardResult.passed,
      reasons,
      breakdown: {
        required_skills_pct: Math.round((reqScore / 40) * 100),
        preferred_skills_pct: Math.round((prefScore / 20) * 100),
        role_alignment_pct: Math.round((roleScore / 15) * 100),
        education_alignment_pct: Math.round((eduScore / 10) * 100),
        location_alignment_pct: Math.round((locScore / 10) * 100),
      },
    };
  }

  /**
   * Scans and prioritizes published opportunities for a student.
   */
  public async discoverOpportunities(studentId: string): Promise<HunterRecommendation[]> {
    const student = db.getProfile(studentId);
    if (!student) throw new Error('Student profile not found');

    const publishedInternships = db.getInternships({ status: 'published' });

    const results: HunterRecommendation[] = [];

    for (const internship of publishedInternships) {
      const matchAnalysis = this.calculateMatch(student, internship);
      const hasApplied = db.hasApplied(studentId, internship.id);

      results.push({
        internship,
        matchAnalysis,
        hasApplied,
      });
    }

    // Sort by compatibility score descending
    results.sort((a, b) => b.matchAnalysis.compatibility_score - a.matchAnalysis.compatibility_score);

    // Generate AI explanation for the top opportunity
    if (results.length > 0) {
      const top = results[0];
      const fallbackText = `Autonomous Hunter Analysis: ${top.internship.title} at ${top.internship.company?.name} is your highest match (${top.matchAnalysis.compatibility_score}%). You possess ${top.matchAnalysis.matching_skills.join(', ')}.`;
      const aiRes = await aiProvider.generateText(
        `Explain why ${top.internship.title} matches a candidate with skills ${top.matchAnalysis.matching_skills.join(', ')}.`,
        fallbackText
      );
      top.aiExplanation = aiRes.content;
    }

    // Log agent run audit
    db.logAgentRun({
      user_id: studentId,
      agent_type: 'hunter_agent',
      status: 'completed',
      trigger_type: 'manual',
      input_summary: { student_id: studentId, open_listings_count: publishedInternships.length },
      output_summary: {
        total_discovered: results.length,
        top_match: results[0] ? `${results[0].internship.title} (${results[0].matchAnalysis.compatibility_score}%)` : 'None',
      },
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    });

    return results;
  }
}

export const hunterAgent = new HunterAgentService();
