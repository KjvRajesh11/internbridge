import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../src/lib/storage/db';
import { hunterAgent } from '../src/services/agents/hunter-agent';
import { guardAgent } from '../src/services/agents/guard-agent';
import { executionAgent } from '../src/services/agents/execution-agent';
import { careerOpsAgent } from '../src/services/agents/career-ops-agent';

describe('InternBridge Core Platform & AI Agent Verification', () => {
  beforeEach(() => {
    // Reset database to clean initial seed
    db.resetToSeed();
  });

  describe('1. Non-Negotiable Business Rule: One Application Per Internship', () => {
    const studentId = 's2000000-0000-0000-0000-000000000002'; // Rohan Mehta
    const internshipId = 'i1000000-0000-0000-0000-000000000001'; // CloudScale Internship

    it('allows a student to submit their first application to an internship', () => {
      // Rohan hasn't applied to CloudScale yet
      expect(db.hasApplied(studentId, internshipId)).toBe(false);

      const app = db.createApplication({
        student_id: studentId,
        internship_id: internshipId,
        cover_letter: 'First application statement',
      });

      expect(app).toBeDefined();
      expect(app.id).toBeDefined();
      expect(app.student_id).toBe(studentId);
      expect(app.internship_id).toBe(internshipId);
      expect(db.hasApplied(studentId, internshipId)).toBe(true);
    });

    it('strictly REJECTS a duplicate application for the same student-internship pair', () => {
      // Priya already applied to i1 in the seed data
      const priyaId = 's1000000-0000-0000-0000-000000000001';
      expect(db.hasApplied(priyaId, internshipId)).toBe(true);

      expect(() => {
        db.createApplication({
          student_id: priyaId,
          internship_id: internshipId,
          cover_letter: 'Duplicate attempt',
        });
      }).toThrow('A student cannot apply to the same internship more than once.');
    });

    it('allows the same student to apply to a DIFFERENT internship', () => {
      const priyaId = 's1000000-0000-0000-0000-000000000001';
      const secondInternshipId = 'i2000000-0000-0000-0000-000000000002'; // Nova Health AI

      expect(db.hasApplied(priyaId, secondInternshipId)).toBe(false);

      const app = db.createApplication({
        student_id: priyaId,
        internship_id: secondInternshipId,
        cover_letter: 'Applying to second role',
      });

      expect(app).toBeDefined();
      expect(app.internship_id).toBe(secondInternshipId);
    });

    it('allows two DIFFERENT students to apply to the SAME internship', () => {
      const student1 = 's2000000-0000-0000-0000-000000000002';
      const student2 = 's3000000-0000-0000-0000-000000000003';
      const targetInternship = 'i3000000-0000-0000-0000-000000000003';

      const app1 = db.createApplication({ student_id: student1, internship_id: targetInternship });
      const app2 = db.createApplication({ student_id: student2, internship_id: targetInternship });

      expect(app1.student_id).toBe(student1);
      expect(app2.student_id).toBe(student2);
      expect(app1.internship_id).toBe(targetInternship);
      expect(app2.internship_id).toBe(targetInternship);
    });
  });

  describe('2. Agent 1: Autonomous Internship Hunter & Deterministic Matching', () => {
    it('calculates weighted compatibility score and surfaces matching vs missing skills', () => {
      const student = db.getProfile('s1000000-0000-0000-0000-000000000001')!;
      const internship = db.getInternship('i1000000-0000-0000-0000-000000000001')!;

      const match = hunterAgent.calculateMatch(student, internship);

      expect(match.compatibility_score).toBeGreaterThanOrEqual(75);
      expect(match.matching_skills).toContain('TypeScript');
      expect(match.matching_skills).toContain('PostgreSQL');
      expect(match.missing_skills).toContain('Go');
      expect(match.breakdown).toBeDefined();
      expect(match.breakdown.required_skills_pct).toBeGreaterThan(0);
    });
  });

  describe('3. Agent 4: Eligibility & Integrity Guard', () => {
    it('blocks applications that fail the minimum GPA requirement', () => {
      // FINEDGE internship requires GPA 8.5
      // Ananya has GPA 8.40
      const guardResult = guardAgent.evaluateEligibility({
        studentId: 's3000000-0000-0000-0000-000000000003',
        internshipId: 'i4000000-0000-0000-0000-000000000004',
      });

      expect(guardResult.passed).toBe(false);
      expect(guardResult.checks.gpa_eligible).toBe(false);
      expect(guardResult.failureReasons.some((r) => r.includes('Minimum GPA requirement'))).toBe(true);
    });

    it('blocks applications when the deadline has expired', () => {
      const expiredInternship = db.createInternship({
        company_id: 'c1000000-0000-0000-0000-000000000001',
        created_by: 'r1000000-0000-0000-0000-000000000001',
        title: 'Expired Internship',
        description: 'Test expired',
        responsibilities: 'None',
        required_skills: ['Java'],
        preferred_skills: [],
        eligibility_rules: {},
        minimum_gpa: 0,
        accepted_graduation_years: [],
        location: 'Remote',
        work_mode: 'remote',
        duration: '3 Months',
        stipend: '₹30,000',
        application_deadline: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        status: 'published',
        openings_count: 1,
      });

      const guardResult = guardAgent.evaluateEligibility({
        studentId: 's2000000-0000-0000-0000-000000000002',
        internshipId: expiredInternship.id,
      });

      expect(guardResult.passed).toBe(false);
      expect(guardResult.checks.deadline_valid).toBe(false);
    });
  });

  describe('4. Application Status Lifecycle & History Audit', () => {
    it('updates application status and appends immutable history audit event', () => {
      const appId = 'a1000000-0000-0000-0000-000000000001';
      const recruiterId = 'r1000000-0000-0000-0000-000000000001';

      const initialHistory = db.getApplicationStatusHistory(appId);
      const initialCount = initialHistory.length;

      const updated = db.updateApplicationStatus(
        appId,
        'interview_scheduled',
        recruiterId,
        'Shortlisted candidate for technical round.'
      );

      expect(updated.status).toBe('interview_scheduled');

      const newHistory = db.getApplicationStatusHistory(appId);
      expect(newHistory.length).toBe(initialCount + 1);
      const latest = newHistory[newHistory.length - 1];
      expect(latest.new_status).toBe('interview_scheduled');
      expect(latest.changed_by).toBe(recruiterId);
      expect(latest.reason).toContain('technical round');
    });
  });

  describe('5. Interview Scheduling & Conflict Prevention', () => {
    it('schedules an interview and atomically locks the slot', () => {
      const slot = db.createInterviewSlot({
        recruiter_id: 'r1000000-0000-0000-0000-000000000001',
        company_id: 'c1000000-0000-0000-0000-000000000001',
        start_time: new Date(Date.now() + 100000).toISOString(),
        end_time: new Date(Date.now() + 145000).toISOString(),
        timezone: 'Asia/Kolkata',
      });

      const interview = db.scheduleInterview({
        application_id: 'a1000000-0000-0000-0000-000000000001',
        interviewer_id: 'r1000000-0000-0000-0000-000000000001',
        start_time: slot.start_time,
        end_time: slot.end_time,
        slot_id: slot.id,
      });

      expect(interview).toBeDefined();
      expect(interview.interview_status).toBe('scheduled');

      // Slot should now be marked booked
      const refreshedSlot = db.interviewSlots.get(slot.id);
      expect(refreshedSlot?.is_booked).toBe(true);

      // Attempting to book the same slot again must throw an error
      expect(() => {
        db.scheduleInterview({
          application_id: 'a1000000-0000-0000-0000-000000000001',
          interviewer_id: 'r1000000-0000-0000-0000-000000000001',
          start_time: slot.start_time,
          end_time: slot.end_time,
          slot_id: slot.id,
        });
      }).toThrow('Interview slot is already booked');
    });
  });
});
