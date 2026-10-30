import {
  Profile,
  Company,
  CompanyMember,
  Internship,
  StudentSkill,
  StudentProject,
  StudentCertification,
  StudentPreferences,
  StudentDocument,
  Application,
  ApplicationStatusHistory,
  Interview,
  InterviewSlot,
  InterviewFeedback,
  NotificationItem,
  AgentRun,
  GeneratedDocument,
  ApplicationStatus,
} from '@/types';

class MemoryDatabase {
  private static instance: MemoryDatabase;

  public profiles: Map<string, Profile> = new Map();
  public companies: Map<string, Company> = new Map();
  public companyMembers: Map<string, CompanyMember> = new Map();
  public internships: Map<string, Internship> = new Map();
  public studentSkills: Map<string, StudentSkill> = new Map();
  public studentProjects: Map<string, StudentProject> = new Map();
  public studentCertifications: Map<string, StudentCertification> = new Map();
  public studentPreferences: Map<string, StudentPreferences> = new Map();
  public studentDocuments: Map<string, StudentDocument> = new Map();
  public applications: Map<string, Application> = new Map();
  public applicationStatusHistory: Map<string, ApplicationStatusHistory> = new Map();
  public interviews: Map<string, Interview> = new Map();
  public interviewSlots: Map<string, InterviewSlot> = new Map();
  public interviewFeedback: Map<string, InterviewFeedback> = new Map();
  public notifications: Map<string, NotificationItem> = new Map();
  public agentRuns: Map<string, AgentRun> = new Map();
  public generatedDocuments: Map<string, GeneratedDocument> = new Map();

  // Active session context for current request/client emulation
  public currentUserId: string = 's1000000-0000-0000-0000-000000000001'; // Default: Priya Sharma (student)

  private constructor() {
    this.seedInitialData();
  }

  public static getInstance(): MemoryDatabase {
    if (!MemoryDatabase.instance) {
      MemoryDatabase.instance = new MemoryDatabase();
    }
    return MemoryDatabase.instance;
  }

  public resetToSeed(): void {
    this.profiles.clear();
    this.companies.clear();
    this.companyMembers.clear();
    this.internships.clear();
    this.studentSkills.clear();
    this.studentProjects.clear();
    this.studentCertifications.clear();
    this.studentPreferences.clear();
    this.studentDocuments.clear();
    this.applications.clear();
    this.applicationStatusHistory.clear();
    this.interviews.clear();
    this.interviewSlots.clear();
    this.interviewFeedback.clear();
    this.notifications.clear();
    this.agentRuns.clear();
    this.generatedDocuments.clear();
    this.seedInitialData();
  }

  private seedInitialData() {
    const now = new Date();
    const inDays = (days: number) => new Date(now.getTime() + days * 86400000).toISOString();
    const pastDays = (days: number) => new Date(now.getTime() - days * 86400000).toISOString();

    // 1. Companies
    const c1: Company = {
      id: 'c1000000-0000-0000-0000-000000000001',
      name: 'CloudScale Technologies',
      description: 'Enterprise cloud infrastructure, distributed database systems, and zero-trust edge computing.',
      website: 'https://cloudscale.example.com',
      industry: 'Cloud Computing & DevOps',
      location: 'Bengaluru, India',
      status: 'active',
      created_at: pastDays(60),
      updated_at: pastDays(60),
    };
    const c2: Company = {
      id: 'c2000000-0000-0000-0000-000000000002',
      name: 'Nova Health AI',
      description: 'Biomedical intelligence and clinical workflow assistance models for precision medicine.',
      website: 'https://novahealth.example.com',
      industry: 'Healthcare AI & Biotech',
      location: 'Hyderabad, India',
      status: 'active',
      created_at: pastDays(45),
      updated_at: pastDays(45),
    };
    const c3: Company = {
      id: 'c3000000-0000-0000-0000-000000000003',
      name: 'FinEdge Global',
      description: 'Ultra low-latency quantitative finance algorithms and cryptographic ledger infrastructure.',
      website: 'https://finedge.example.com',
      industry: 'FinTech & Quant Finance',
      location: 'Mumbai, India',
      status: 'active',
      created_at: pastDays(30),
      updated_at: pastDays(30),
    };
    this.companies.set(c1.id, c1);
    this.companies.set(c2.id, c2);
    this.companies.set(c3.id, c3);

    // 2. Profiles
    // Student 1: Priya Sharma
    const s1: Profile = {
      id: 's1000000-0000-0000-0000-000000000001',
      role: 'student',
      full_name: 'Priya Sharma',
      email: 'priya.sharma@example.edu',
      phone: '+91 98765 43210',
      education: 'National Institute of Technology',
      degree: 'B.Tech',
      department: 'Computer Science and Engineering',
      graduation_year: 2026,
      gpa: 8.85,
      location: 'Bengaluru, India',
      professional_summary:
        'Full-stack and cloud software engineering student passionate about distributed systems, microservices, and React. Built high-throughput task worker engines with Redis and Node.js.',
      preferences: { target_roles: ['Cloud Infrastructure Engineer', 'Full Stack Engineer'], work_modes: ['remote', 'hybrid'] },
      created_at: pastDays(40),
      updated_at: pastDays(1),
    };

    // Student 2: Rohan Mehta
    const s2: Profile = {
      id: 's2000000-0000-0000-0000-000000000002',
      role: 'student',
      full_name: 'Rohan Mehta',
      email: 'rohan.mehta@example.edu',
      phone: '+91 91234 56789',
      education: 'Indian Institute of Technology',
      degree: 'B.Tech',
      department: 'Data Science & Artificial Intelligence',
      graduation_year: 2026,
      gpa: 9.10,
      location: 'Hyderabad, India',
      professional_summary:
        'Machine learning engineering student experienced with PyTorch, Transformer fine-tuning, and model deployment on Kubernetes. Built clinical text parsing pipelines.',
      preferences: { target_roles: ['Machine Learning Engineer', 'AI Research Intern'], work_modes: ['remote'] },
      created_at: pastDays(30),
      updated_at: pastDays(2),
    };

    // Student 3: Ananya Iyer
    const s3: Profile = {
      id: 's3000000-0000-0000-0000-000000000003',
      role: 'student',
      full_name: 'Ananya Iyer',
      email: 'ananya.iyer@example.edu',
      phone: '+91 94567 89012',
      education: 'Birla Institute of Technology and Science',
      degree: 'B.E.',
      department: 'Computer Science',
      graduation_year: 2027,
      gpa: 8.40,
      location: 'Pune, India',
      professional_summary:
        'Frontend engineer specializing in design systems, Web Vitals optimization, and responsive web accessibility with Next.js and TypeScript.',
      preferences: { target_roles: ['Frontend Engineer', 'Product Engineer'], work_modes: ['in-office', 'hybrid'] },
      created_at: pastDays(20),
      updated_at: pastDays(3),
    };

    // Recruiter 1: Alex Rivera (CloudScale)
    const r1: Profile = {
      id: 'r1000000-0000-0000-0000-000000000001',
      role: 'recruiter',
      full_name: 'Alex Rivera',
      email: 'alex.rivera@cloudscale.example.com',
      education: 'University of Washington',
      degree: 'M.S.',
      department: 'Information Systems',
      location: 'Bengaluru, India',
      professional_summary: 'Staff Technical Recruiter at CloudScale Technologies leading early-career cloud engineering hiring.',
      created_at: pastDays(60),
      updated_at: pastDays(10),
    };

    // Recruiter 2: Marcus Vance (Nova Health AI)
    const r2: Profile = {
      id: 'r2000000-0000-0000-0000-000000000002',
      role: 'recruiter',
      full_name: 'Marcus Vance',
      email: 'marcus.vance@novahealth.example.com',
      education: 'Georgia Tech',
      degree: 'M.S.',
      department: 'Human-Computer Interaction',
      location: 'Hyderabad, India',
      professional_summary: 'Head of Talent Acquisition at Nova Health AI recruiting top researchers and applied AI engineers.',
      created_at: pastDays(50),
      updated_at: pastDays(5),
    };

    this.profiles.set(s1.id, s1);
    this.profiles.set(s2.id, s2);
    this.profiles.set(s3.id, s3);
    this.profiles.set(r1.id, r1);
    this.profiles.set(r2.id, r2);

    // 3. Company Members
    this.companyMembers.set('cm1', {
      id: 'cm1',
      company_id: c1.id,
      user_id: r1.id,
      role: 'admin',
      membership_status: 'active',
      created_at: pastDays(60),
    });
    this.companyMembers.set('cm2', {
      id: 'cm2',
      company_id: c2.id,
      user_id: r2.id,
      role: 'admin',
      membership_status: 'active',
      created_at: pastDays(50),
    });

    // 4. Internships
    const i1: Internship = {
      id: 'i1000000-0000-0000-0000-000000000001',
      company_id: c1.id,
      created_by: r1.id,
      title: 'Cloud Infrastructure & Backend Engineering Intern',
      description:
        'Join CloudScale Technologies to design, build, and optimize high-throughput distributed microservices on modern cloud infrastructure. You will collaborate with staff engineers on latency reduction and automated failover pipelines.',
      responsibilities:
        '1. Implement and benchmark REST/gRPC microservices in Go or Node.js.\n2. Write automated integration test suites and Terraform modules.\n3. Optimize PostgreSQL query execution plans and caching policies.',
      required_skills: ['Go', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      preferred_skills: ['Kubernetes', 'Redis', 'AWS', 'GraphQL'],
      eligibility_rules: {
        min_gpa: 7.5,
        allowed_degrees: ['B.Tech', 'B.E.', 'M.Tech'],
        allowed_years: [2026, 2027],
      },
      minimum_gpa: 7.5,
      accepted_graduation_years: [2026, 2027],
      location: 'Bengaluru, India',
      work_mode: 'hybrid',
      duration: '6 Months',
      stipend: '₹55,000 / month',
      application_deadline: inDays(30),
      status: 'published',
      openings_count: 3,
      created_at: pastDays(10),
      updated_at: pastDays(2),
    };

    const i2: Internship = {
      id: 'i2000000-0000-0000-0000-000000000002',
      company_id: c2.id,
      created_by: r2.id,
      title: 'Applied AI & Machine Learning Research Intern',
      description:
        'Nova Health AI is seeking passionate ML interns to develop clinical diagnostic assistance models and biomedical NLP processing pipelines. You will work on privacy-preserving model tuning and clinical validation.',
      responsibilities:
        '1. Fine-tune open-source foundation models on structured clinical datasets.\n2. Design evaluation benchmarks for retrieval-augmented generation.\n3. Implement model quantizations and low-latency API serving.',
      required_skills: ['Python', 'PyTorch', 'Machine Learning', 'NLP', 'FastAPI'],
      preferred_skills: ['Hugging Face', 'Docker', 'MLflow', 'RAG'],
      eligibility_rules: {
        min_gpa: 8.0,
        allowed_degrees: ['B.Tech', 'M.Tech', 'M.S.'],
        allowed_years: [2026, 2027],
      },
      minimum_gpa: 8.0,
      accepted_graduation_years: [2026, 2027],
      location: 'Remote',
      work_mode: 'remote',
      duration: '6 Months',
      stipend: '₹60,000 / month',
      application_deadline: inDays(25),
      status: 'published',
      openings_count: 2,
      created_at: pastDays(8),
      updated_at: pastDays(1),
    };

    const i3: Internship = {
      id: 'i3000000-0000-0000-0000-000000000003',
      company_id: c1.id,
      created_by: r1.id,
      title: 'Frontend Platform & Design Systems Intern',
      description:
        'Collaborate with our product design and platform team to build accessible, fluid, and robust UI primitives used across CloudScale dashboards and analytics tooling.',
      responsibilities:
        '1. Develop component libraries using React 19, TypeScript, and Tailwind CSS.\n2. Ensure WCAG 2.1 AA accessibility compliance and keyboard navigation.\n3. Profile frontend render speeds and bundle footprints.',
      required_skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      preferred_skills: ['Framer Motion', 'Storybook', 'Web Vitals'],
      eligibility_rules: {
        min_gpa: 7.0,
        allowed_degrees: ['B.Tech', 'B.E.', 'B.Sc', 'BCA'],
        allowed_years: [2026, 2027, 2028],
      },
      minimum_gpa: 7.0,
      accepted_graduation_years: [2026, 2027, 2028],
      location: 'Bengaluru, India',
      work_mode: 'in-office',
      duration: '3 Months',
      stipend: '₹40,000 / month',
      application_deadline: inDays(15),
      status: 'published',
      openings_count: 2,
      created_at: pastDays(5),
      updated_at: pastDays(1),
    };

    const i4: Internship = {
      id: 'i4000000-0000-0000-0000-000000000004',
      company_id: c3.id,
      created_by: r1.id,
      title: 'Quantitative Systems & Algorithmic Trading Intern',
      description:
        'Build ultra-low latency market data processors and execution order routers for global financial markets.',
      responsibilities:
        '1. Optimize C++20 and Python multi-threaded order queue handlers.\n2. Run historical backtesting on high-frequency market tick data.',
      required_skills: ['Python', 'C++', 'Data Structures', 'Algorithms'],
      preferred_skills: ['Linux Kernel', 'Sockets', 'Pandas'],
      eligibility_rules: {
        min_gpa: 8.5,
        allowed_degrees: ['B.Tech', 'B.E.'],
        allowed_years: [2026],
      },
      minimum_gpa: 8.5,
      accepted_graduation_years: [2026],
      location: 'Mumbai, India',
      work_mode: 'in-office',
      duration: '6 Months',
      stipend: '₹75,000 / month',
      application_deadline: inDays(45),
      status: 'published',
      openings_count: 1,
      created_at: pastDays(12),
      updated_at: pastDays(4),
    };

    this.internships.set(i1.id, i1);
    this.internships.set(i2.id, i2);
    this.internships.set(i3.id, i3);
    this.internships.set(i4.id, i4);

    // 5. Student Skills
    const addSkill = (studentId: string, name: string, level: 'beginner' | 'intermediate' | 'advanced' | 'expert', verified: boolean) => {
      const id = `sk-${studentId}-${name}`;
      this.studentSkills.set(id, {
        id,
        student_id: studentId,
        skill_name: name,
        proficiency_level: level,
        verified,
        created_at: pastDays(30),
      });
    };
    addSkill(s1.id, 'TypeScript', 'expert', true);
    addSkill(s1.id, 'Node.js', 'advanced', true);
    addSkill(s1.id, 'PostgreSQL', 'advanced', true);
    addSkill(s1.id, 'Docker', 'intermediate', false);
    addSkill(s1.id, 'React', 'advanced', true);

    addSkill(s2.id, 'Python', 'expert', true);
    addSkill(s2.id, 'PyTorch', 'expert', true);
    addSkill(s2.id, 'Machine Learning', 'advanced', true);
    addSkill(s2.id, 'FastAPI', 'intermediate', true);

    addSkill(s3.id, 'React', 'expert', true);
    addSkill(s3.id, 'TypeScript', 'advanced', true);
    addSkill(s3.id, 'Tailwind CSS', 'expert', true);
    addSkill(s3.id, 'Next.js', 'intermediate', true);

    // 6. Student Projects
    const p1: StudentProject = {
      id: 'p1000000-0000-0000-0000-000000000001',
      student_id: s1.id,
      title: 'Distributed Task Queue Engine',
      description:
        'High-throughput asynchronous task worker queue with Redis backing, exponential backoff retries, and dead-letter queue inspection dashboard.',
      technologies: ['TypeScript', 'Node.js', 'Redis', 'Docker'],
      repo_url: 'https://github.com/priyasharma/dist-task-queue',
      live_url: 'https://task-engine-demo.dev',
      featured: true,
      created_at: pastDays(25),
    };
    const p2: StudentProject = {
      id: 'p2000000-0000-0000-0000-000000000002',
      student_id: s1.id,
      title: 'Real-Time Collaborative Code Editor',
      description:
        'WebSockets and operational transformation powered in-browser code editor with multi-user cursors and syntax highlighting.',
      technologies: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
      repo_url: 'https://github.com/priyasharma/collab-code',
      live_url: 'https://collab-code.dev',
      featured: true,
      created_at: pastDays(15),
    };
    this.studentProjects.set(p1.id, p1);
    this.studentProjects.set(p2.id, p2);

    // 7. Student Preferences
    this.studentPreferences.set(s1.id, {
      student_id: s1.id,
      target_roles: ['Cloud Infrastructure Engineer', 'Full Stack Engineer', 'Backend Engineer'],
      preferred_skills: ['TypeScript', 'Go', 'PostgreSQL', 'Docker'],
      preferred_locations: ['Bengaluru', 'Remote'],
      work_mode_preference: ['hybrid', 'remote'],
      min_stipend: '₹40,000',
      max_duration_months: 6,
      auto_apply_enabled: true,
      auto_apply_settings: {
        match_threshold: 80,
        max_weekly_apps: 5,
        require_approval: true,
        allowed_modes: ['hybrid', 'remote'],
      },
      notification_preferences: {
        email: true,
        in_app: true,
      },
      updated_at: pastDays(2),
    });

    // 8. Student Documents
    this.studentDocuments.set('doc-1', {
      id: 'doc-1',
      student_id: s1.id,
      document_type: 'resume',
      file_name: 'Priya_Sharma_Resume_2026.pdf',
      file_url: 'https://storage.internbridge.internal/resumes/priya_sharma_cloudscale.pdf',
      file_size: 245000,
      parsed_content:
        'Priya Sharma - B.Tech CSE (2026), GPA 8.85. Experience: Distributed Task Queue with Redis/Docker, Collaborative Editor with React/TypeScript.',
      is_primary: true,
      created_at: pastDays(20),
    });

    // 9. Initial Application (Priya applied to CloudScale Backend Internship)
    const app1: Application = {
      id: 'a1000000-0000-0000-0000-000000000001',
      student_id: s1.id,
      internship_id: i1.id,
      status: 'shortlisted',
      resume_url: 'https://storage.internbridge.internal/resumes/priya_sharma_cloudscale.pdf',
      answers: {
        why_company: 'CloudScale handles scale challenges that align with my distributed queue project.',
        notice_period: 'Available immediately',
      },
      cover_letter:
        'Dear CloudScale Hiring Team, I am writing to express my strong enthusiasm for the Cloud Infrastructure & Backend Engineering Internship. Having developed a distributed task queue engine handling 10k ops/sec with Redis and Docker, I am excited to apply my skills to your distributed microservices stack.',
      match_score: 92.5,
      match_analysis: {
        compatibility_score: 92.5,
        matching_skills: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        missing_skills: ['Go', 'Kubernetes'],
        eligibility_passed: true,
        reasons: [
          'Strong match in backend engineering and relational database design.',
          'GPA 8.85 exceeds the 7.50 requirement.',
          'Graduation year 2026 matches accepted graduation cohort.',
        ],
        breakdown: {
          required_skills_pct: 80,
          preferred_skills_pct: 75,
          role_alignment_pct: 100,
          education_alignment_pct: 100,
          location_alignment_pct: 100,
        },
      },
      submission_timestamp: pastDays(3),
      updated_at: pastDays(1),
    };
    this.applications.set(app1.id, app1);

    // 10. Status History for App 1
    this.applicationStatusHistory.set('h1', {
      id: 'h1',
      application_id: app1.id,
      previous_status: undefined,
      new_status: 'applied',
      changed_by: s1.id,
      change_timestamp: pastDays(3),
      reason: 'Application submitted by candidate via InternBridge portal.',
    });
    this.applicationStatusHistory.set('h2', {
      id: 'h2',
      application_id: app1.id,
      previous_status: 'applied',
      new_status: 'under_review',
      changed_by: r1.id,
      change_timestamp: pastDays(2),
      reason: 'Candidate resume and project portfolio under technical team review.',
    });
    this.applicationStatusHistory.set('h3', {
      id: 'h3',
      application_id: app1.id,
      previous_status: 'under_review',
      new_status: 'shortlisted',
      changed_by: r1.id,
      change_timestamp: pastDays(1),
      reason: 'Candidate demonstrates exceptional distributed systems knowledge and exceeds GPA threshold.',
    });

    // 11. Interview Slots
    const slot1: InterviewSlot = {
      id: 'isl10000-0000-0000-0000-000000000001',
      recruiter_id: r1.id,
      company_id: c1.id,
      start_time: inDays(2),
      end_time: new Date(new Date(inDays(2)).getTime() + 45 * 60000).toISOString(),
      timezone: 'Asia/Kolkata',
      is_booked: true,
      booked_by_application_id: app1.id,
      created_at: pastDays(5),
    };
    const slot2: InterviewSlot = {
      id: 'isl20000-0000-0000-0000-000000000002',
      recruiter_id: r1.id,
      company_id: c1.id,
      start_time: inDays(3),
      end_time: new Date(new Date(inDays(3)).getTime() + 45 * 60000).toISOString(),
      timezone: 'Asia/Kolkata',
      is_booked: false,
      booked_by_application_id: undefined,
      created_at: pastDays(5),
    };
    this.interviewSlots.set(slot1.id, slot1);
    this.interviewSlots.set(slot2.id, slot2);

    // 12. Interview Scheduled
    const int1: Interview = {
      id: 'int10000-0000-0000-0000-000000000001',
      application_id: app1.id,
      interviewer_id: r1.id,
      start_time: inDays(2),
      end_time: new Date(new Date(inDays(2)).getTime() + 45 * 60000).toISOString(),
      timezone: 'Asia/Kolkata',
      interview_mode: 'video',
      meeting_url: 'https://meet.internbridge.internal/cloudscale-technical-interview-902',
      interview_status: 'scheduled',
      candidate_instructions:
        'Technical architectural discussion on distributed queues, database indexing, and your project portfolio. Please have your code editor ready.',
      created_at: pastDays(1),
      updated_at: pastDays(1),
    };
    this.interviews.set(int1.id, int1);

    // 13. Notifications
    this.notifications.set('n1', {
      id: 'n1',
      recipient_id: s1.id,
      type: 'application_status',
      title: 'Application Shortlisted 🎉',
      message: 'Your application for Cloud Infrastructure & Backend Engineering Intern has been shortlisted by CloudScale Technologies.',
      link: `/student/applications/${app1.id}`,
      read: false,
      created_at: pastDays(1),
    });
    this.notifications.set('n2', {
      id: 'n2',
      recipient_id: s1.id,
      type: 'interview_scheduled',
      title: 'Technical Interview Scheduled',
      message: 'Your interview with Alex Rivera is confirmed for 2 days from now. Access the AI Prep Workspace to get ready!',
      link: '/student/interviews',
      read: false,
      created_at: pastDays(1),
    });
    this.notifications.set('n3', {
      id: 'n3',
      recipient_id: r1.id,
      type: 'new_application',
      title: 'New Candidate Application',
      message: 'Priya Sharma applied for Cloud Infrastructure & Backend Engineering Intern with a 92.5% compatibility score.',
      link: `/recruiter/applicants/${app1.id}`,
      read: true,
      created_at: pastDays(3),
    });

    // 14. Agent Runs
    this.agentRuns.set('ar1', {
      id: 'ar1',
      user_id: s1.id,
      agent_type: 'hunter_agent',
      status: 'completed',
      trigger_type: 'manual',
      input_summary: { student_skills: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'], gpa: 8.85 },
      output_summary: { recommendations_count: 3, top_match: 'Cloud Infrastructure & Backend Engineering Intern (92.5%)' },
      started_at: pastDays(3),
      completed_at: pastDays(3),
    });
    this.agentRuns.set('ar2', {
      id: 'ar2',
      user_id: s1.id,
      agent_type: 'guard_agent',
      status: 'completed',
      trigger_type: 'auto',
      input_summary: { internship_id: i1.id, student_id: s1.id },
      output_summary: { status: 'passed', duplicate_check: 'no_duplicate', deadline_check: 'valid', eligibility_check: 'passed' },
      started_at: pastDays(3),
      completed_at: pastDays(3),
    });
  }

  // Session & User Switching
  public setCurrentUser(userId: string) {
    if (this.profiles.has(userId)) {
      this.currentUserId = userId;
    }
  }

  public getCurrentUser(): Profile {
    return this.profiles.get(this.currentUserId) || Array.from(this.profiles.values())[0];
  }

  // Profile queries
  public getProfile(id: string): Profile | undefined {
    return this.profiles.get(id);
  }

  public updateProfile(id: string, updates: Partial<Profile>): Profile {
    const existing = this.profiles.get(id);
    if (!existing) throw new Error('Profile not found');
    const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.profiles.set(id, updated);
    return updated;
  }

  // Company queries
  public getCompanies(): Company[] {
    return Array.from(this.companies.values());
  }

  public getCompany(id: string): Company | undefined {
    return this.companies.get(id);
  }

  public getCompanyByRecruiter(recruiterId: string): Company | undefined {
    const member = Array.from(this.companyMembers.values()).find((m) => m.user_id === recruiterId);
    if (!member) return undefined;
    return this.companies.get(member.company_id);
  }

  // Internship queries
  public getInternships(filter?: {
    status?: string;
    search?: string;
    workMode?: string;
    companyId?: string;
  }): Internship[] {
    let list = Array.from(this.internships.values());

    if (filter?.status) {
      list = list.filter((item) => item.status === filter.status);
    }
    if (filter?.companyId) {
      list = list.filter((item) => item.company_id === filter.companyId);
    }
    if (filter?.workMode && filter.workMode !== 'all') {
      list = list.filter((item) => item.work_mode === filter.workMode);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.required_skills.some((s) => s.toLowerCase().includes(q)) ||
          item.location.toLowerCase().includes(q)
      );
    }

    return list.map((item) => ({
      ...item,
      company: this.companies.get(item.company_id),
    }));
  }

  public getInternship(id: string): Internship | undefined {
    const item = this.internships.get(id);
    if (!item) return undefined;
    return {
      ...item,
      company: this.companies.get(item.company_id),
    };
  }

  public createInternship(internshipData: Omit<Internship, 'id' | 'created_at' | 'updated_at'>): Internship {
    const id = `i-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newInternship: Internship = {
      ...internshipData,
      id,
      created_at: now,
      updated_at: now,
    };
    this.internships.set(id, newInternship);
    return newInternship;
  }

  public updateInternship(id: string, updates: Partial<Internship>): Internship {
    const existing = this.internships.get(id);
    if (!existing) throw new Error('Internship not found');
    const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.internships.set(id, updated);
    return updated;
  }

  // Application queries & STRICT DUPLICATE PREVENTION
  public getApplications(filter?: { studentId?: string; internshipId?: string; companyId?: string }): Application[] {
    let list = Array.from(this.applications.values());

    if (filter?.studentId) {
      list = list.filter((a) => a.student_id === filter.studentId);
    }
    if (filter?.internshipId) {
      list = list.filter((a) => a.internship_id === filter.internshipId);
    }
    if (filter?.companyId) {
      list = list.filter((a) => {
        const intern = this.internships.get(a.internship_id);
        return intern?.company_id === filter.companyId;
      });
    }

    return list.map((a) => ({
      ...a,
      student: this.profiles.get(a.student_id),
      internship: this.getInternship(a.internship_id),
    }));
  }

  public getApplication(id: string): Application | undefined {
    const a = this.applications.get(id);
    if (!a) return undefined;
    return {
      ...a,
      student: this.profiles.get(a.student_id),
      internship: this.getInternship(a.internship_id),
    };
  }

  public hasApplied(studentId: string, internshipId: string): boolean {
    return Array.from(this.applications.values()).some(
      (a) => a.student_id === studentId && a.internship_id === internshipId
    );
  }

  /**
   * CRITICAL NON-NEGOTIABLE BUSINESS RULE:
   * "A student cannot apply to the same internship more than once."
   * Enforced with atomic duplicate verification and database unique constraint simulation.
   */
  public createApplication(data: {
    student_id: string;
    internship_id: string;
    resume_url?: string;
    answers?: Record<string, string>;
    cover_letter?: string;
    match_score?: number;
    match_analysis?: any;
  }): Application {
    // 1. HARD CHECK FOR DUPLICATE APPLICATION
    if (this.hasApplied(data.student_id, data.internship_id)) {
      const err = new Error('A student cannot apply to the same internship more than once.');
      (err as any).code = 'DUPLICATE_APPLICATION';
      throw err;
    }

    // 2. Validate internship exists and is open
    const internship = this.internships.get(data.internship_id);
    if (!internship) {
      throw new Error('Internship not found.');
    }
    if (internship.status !== 'published') {
      throw new Error('This internship is no longer accepting applications.');
    }
    if (new Date(internship.application_deadline) < new Date()) {
      throw new Error('The application deadline for this internship has passed.');
    }

    const id = `a-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const application: Application = {
      id,
      student_id: data.student_id,
      internship_id: data.internship_id,
      status: 'applied',
      resume_url: data.resume_url,
      answers: data.answers || {},
      cover_letter: data.cover_letter,
      match_score: data.match_score,
      match_analysis: data.match_analysis,
      submission_timestamp: now,
      updated_at: now,
    };

    // Store in database
    this.applications.set(id, application);

    // Record initial status history event
    const historyId = `h-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    this.applicationStatusHistory.set(historyId, {
      id: historyId,
      application_id: id,
      previous_status: undefined,
      new_status: 'applied',
      changed_by: data.student_id,
      change_timestamp: now,
      reason: 'Application submitted by candidate via InternBridge portal.',
    });

    // Notify recruiter of company
    const member = Array.from(this.companyMembers.values()).find(
      (m) => m.company_id === internship.company_id
    );
    if (member) {
      const student = this.profiles.get(data.student_id);
      this.createNotification({
        recipient_id: member.user_id,
        type: 'new_application',
        title: 'New Candidate Application',
        message: `${student?.full_name || 'A candidate'} applied for ${internship.title}.`,
        link: `/recruiter/applicants/${id}`,
      });
    }

    // Notify student
    this.createNotification({
      recipient_id: data.student_id,
      type: 'application_submitted',
      title: 'Application Received ✅',
      message: `Your application for ${internship.title} has been recorded successfully.`,
      link: `/student/applications/${id}`,
    });

    return application;
  }

  public updateApplicationStatus(
    applicationId: string,
    newStatus: ApplicationStatus,
    changedById: string,
    reason?: string
  ): Application {
    const app = this.applications.get(applicationId);
    if (!app) throw new Error('Application not found');

    const previousStatus = app.status;
    const now = new Date().toISOString();

    app.status = newStatus;
    app.updated_at = now;
    if (newStatus === 'selected' || newStatus === 'rejected') {
      app.final_decision_timestamp = now;
    }
    this.applications.set(applicationId, app);

    // Record in history
    const historyId = `h-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    this.applicationStatusHistory.set(historyId, {
      id: historyId,
      application_id: applicationId,
      previous_status: previousStatus,
      new_status: newStatus,
      changed_by: changedById,
      change_timestamp: now,
      reason: reason || `Status updated from ${previousStatus} to ${newStatus}`,
    });

    // Notify student of status update
    const internship = this.internships.get(app.internship_id);
    const statusTitles: Record<ApplicationStatus, string> = {
      applied: 'Application Recorded',
      under_review: 'Application Under Review 🔍',
      shortlisted: 'You Have Been Shortlisted! 🌟',
      interview_scheduled: 'Interview Scheduled 📅',
      selected: 'Congratulations! Selected 🎉',
      rejected: 'Application Status Update',
      withdrawn: 'Application Withdrawn',
    };

    this.createNotification({
      recipient_id: app.student_id,
      type: 'application_status',
      title: statusTitles[newStatus] || 'Application Update',
      message: `Your application for ${internship?.title || 'internship'} is now ${newStatus.replace('_', ' ')}.`,
      link: `/student/applications/${applicationId}`,
    });

    return app;
  }

  public getApplicationStatusHistory(applicationId: string): ApplicationStatusHistory[] {
    return Array.from(this.applicationStatusHistory.values())
      .filter((h) => h.application_id === applicationId)
      .sort((a, b) => new Date(a.change_timestamp).getTime() - new Date(b.change_timestamp).getTime())
      .map((h) => ({
        ...h,
        changed_by_profile: this.profiles.get(h.changed_by),
      }));
  }

  // Interview scheduling queries
  public getInterviews(filter?: { studentId?: string; recruiterId?: string }): Interview[] {
    let list = Array.from(this.interviews.values());

    if (filter?.studentId) {
      list = list.filter((i) => {
        const app = this.applications.get(i.application_id);
        return app?.student_id === filter.studentId;
      });
    }

    if (filter?.recruiterId) {
      list = list.filter((i) => i.interviewer_id === filter.recruiterId);
    }

    return list.map((i) => ({
      ...i,
      application: this.getApplication(i.application_id),
      interviewer: this.profiles.get(i.interviewer_id),
    }));
  }

  public getInterview(id: string): Interview | undefined {
    const item = this.interviews.get(id);
    if (!item) return undefined;
    return {
      ...item,
      application: this.getApplication(item.application_id),
      interviewer: this.profiles.get(item.interviewer_id),
    };
  }

  public getInterviewSlots(filter?: { recruiterId?: string; companyId?: string; unbookedOnly?: boolean }): InterviewSlot[] {
    let list = Array.from(this.interviewSlots.values());
    if (filter?.recruiterId) list = list.filter((s) => s.recruiter_id === filter.recruiterId);
    if (filter?.companyId) list = list.filter((s) => s.company_id === filter.companyId);
    if (filter?.unbookedOnly) list = list.filter((s) => !s.is_booked);
    return list;
  }

  public createInterviewSlot(slotData: Omit<InterviewSlot, 'id' | 'is_booked' | 'created_at'>): InterviewSlot {
    const id = `isl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const slot: InterviewSlot = {
      ...slotData,
      id,
      is_booked: false,
      created_at: new Date().toISOString(),
    };
    this.interviewSlots.set(id, slot);
    return slot;
  }

  public scheduleInterview(params: {
    application_id: string;
    interviewer_id: string;
    start_time: string;
    end_time: string;
    timezone?: string;
    interview_mode?: 'video' | 'in-person' | 'phone';
    meeting_url?: string;
    candidate_instructions?: string;
    slot_id?: string;
  }): Interview {
    const app = this.applications.get(params.application_id);
    if (!app) throw new Error('Application not found');

    // If booking a specific slot, verify availability atomically
    if (params.slot_id) {
      const slot = this.interviewSlots.get(params.slot_id);
      if (!slot) throw new Error('Interview slot not found');
      if (slot.is_booked) throw new Error('Interview slot is already booked');
      slot.is_booked = true;
      slot.booked_by_application_id = params.application_id;
      this.interviewSlots.set(params.slot_id, slot);
    }

    const id = `int-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const interview: Interview = {
      id,
      application_id: params.application_id,
      interviewer_id: params.interviewer_id,
      start_time: params.start_time,
      end_time: params.end_time,
      timezone: params.timezone || 'Asia/Kolkata',
      interview_mode: params.interview_mode || 'video',
      meeting_url: params.meeting_url || 'https://meet.internbridge.internal/room-' + Math.random().toString(36).substring(2, 8),
      interview_status: 'scheduled',
      candidate_instructions: params.candidate_instructions || 'Please prepare to discuss your previous projects and technical skills.',
      created_at: now,
      updated_at: now,
    };

    this.interviews.set(id, interview);

    // Update application status to interview_scheduled
    this.updateApplicationStatus(params.application_id, 'interview_scheduled', params.interviewer_id, 'Interview has been scheduled.');

    return interview;
  }

  // Interview Feedback
  public recordInterviewFeedback(feedback: Omit<InterviewFeedback, 'id' | 'created_at'>): InterviewFeedback {
    const id = `fb-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const record: InterviewFeedback = {
      ...feedback,
      id,
      created_at: new Date().toISOString(),
    };
    this.interviewFeedback.set(id, record);
    return record;
  }

  public getInterviewFeedback(applicationId: string): InterviewFeedback[] {
    return Array.from(this.interviewFeedback.values()).filter((f) => f.application_id === applicationId);
  }

  // Notifications
  public getNotifications(recipientId: string): NotificationItem[] {
    return Array.from(this.notifications.values())
      .filter((n) => n.recipient_id === recipientId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public createNotification(data: Omit<NotificationItem, 'id' | 'read' | 'created_at'>): NotificationItem {
    const id = `n-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const item: NotificationItem = {
      ...data,
      id,
      read: false,
      created_at: new Date().toISOString(),
    };
    this.notifications.set(id, item);
    return item;
  }

  public markNotificationAsRead(id: string): void {
    const item = this.notifications.get(id);
    if (item) {
      item.read = true;
      this.notifications.set(id, item);
    }
  }

  // Agent Runs & Audits
  public logAgentRun(run: Omit<AgentRun, 'id'>): AgentRun {
    const id = `ar-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const record: AgentRun = {
      ...run,
      id,
    };
    this.agentRuns.set(id, record);
    return record;
  }

  public getAgentRuns(userId: string): AgentRun[] {
    return Array.from(this.agentRuns.values())
      .filter((r) => r.user_id === userId)
      .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
  }

  // Student Skills & Projects
  public getStudentSkills(studentId: string): StudentSkill[] {
    return Array.from(this.studentSkills.values()).filter((s) => s.student_id === studentId);
  }

  public addStudentSkill(skill: Omit<StudentSkill, 'id' | 'created_at'>): StudentSkill {
    const id = `sk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const record: StudentSkill = { ...skill, id, created_at: new Date().toISOString() };
    this.studentSkills.set(id, record);
    return record;
  }

  public removeStudentSkill(id: string): void {
    this.studentSkills.delete(id);
  }

  public getStudentProjects(studentId: string): StudentProject[] {
    return Array.from(this.studentProjects.values()).filter((p) => p.student_id === studentId);
  }

  public addStudentProject(project: Omit<StudentProject, 'id' | 'created_at'>): StudentProject {
    const id = `p-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const record: StudentProject = { ...project, id, created_at: new Date().toISOString() };
    this.studentProjects.set(id, record);
    return record;
  }

  public getStudentPreferences(studentId: string): StudentPreferences | undefined {
    return this.studentPreferences.get(studentId);
  }

  public updateStudentPreferences(studentId: string, updates: Partial<StudentPreferences>): StudentPreferences {
    const existing = this.studentPreferences.get(studentId) || {
      student_id: studentId,
      target_roles: [],
      preferred_skills: [],
      preferred_locations: [],
      work_mode_preference: [],
      auto_apply_enabled: false,
      auto_apply_settings: { match_threshold: 80, max_weekly_apps: 5, require_approval: true },
      notification_preferences: { email: true, in_app: true },
      updated_at: new Date().toISOString(),
    };
    const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.studentPreferences.set(studentId, updated);
    return updated;
  }

  public getStudentDocuments(studentId: string): StudentDocument[] {
    return Array.from(this.studentDocuments.values()).filter((d) => d.student_id === studentId);
  }

  public addStudentDocument(doc: Omit<StudentDocument, 'id' | 'created_at'>): StudentDocument {
    const id = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const record: StudentDocument = { ...doc, id, created_at: new Date().toISOString() };
    this.studentDocuments.set(id, record);
    return record;
  }
}

// Export singleton database instance
export const db = MemoryDatabase.getInstance();

