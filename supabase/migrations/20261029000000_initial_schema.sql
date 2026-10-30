-- InternBridge PostgreSQL Schema Migration
-- Migration: 20261029000000_initial_schema.sql
-- Description: Core tables, foreign keys, unique constraints, and Row Level Security for InternBridge

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'recruiter', 'admin')),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    education VARCHAR(255),
    degree VARCHAR(100),
    department VARCHAR(150),
    graduation_year INTEGER,
    gpa NUMERIC(4, 2),
    location VARCHAR(150),
    professional_summary TEXT,
    preferences JSONB DEFAULT '{}'::jsonb,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    industry VARCHAR(100),
    location VARCHAR(150),
    logo_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending_verification', 'suspended')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. COMPANY MEMBERS TABLE
CREATE TABLE IF NOT EXISTS company_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'recruiter' CHECK (role IN ('owner', 'admin', 'recruiter', 'hiring_manager')),
    membership_status VARCHAR(20) DEFAULT 'active' CHECK (membership_status IN ('active', 'invited', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_company_user UNIQUE (company_id, user_id)
);

-- 4. INTERNSHIPS TABLE
CREATE TABLE IF NOT EXISTS internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES profiles(id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT,
    required_skills TEXT[] DEFAULT '{}',
    preferred_skills TEXT[] DEFAULT '{}',
    eligibility_rules JSONB DEFAULT '{}'::jsonb,
    minimum_gpa NUMERIC(4, 2) DEFAULT 0.0,
    accepted_graduation_years INTEGER[] DEFAULT '{}',
    location VARCHAR(150) NOT NULL,
    work_mode VARCHAR(20) NOT NULL CHECK (work_mode IN ('remote', 'hybrid', 'in-office')),
    duration VARCHAR(50) NOT NULL,
    stipend VARCHAR(100) NOT NULL,
    application_deadline TIMESTAMPTZ NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed', 'archived')),
    openings_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. STUDENT SKILLS
CREATE TABLE IF NOT EXISTS student_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(20) DEFAULT 'intermediate' CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_student_skill UNIQUE (student_id, skill_name)
);

-- 6. STUDENT PROJECTS
CREATE TABLE IF NOT EXISTS student_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    repo_url TEXT,
    live_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. STUDENT CERTIFICATIONS
CREATE TABLE IF NOT EXISTS student_certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    issuing_org VARCHAR(200) NOT NULL,
    issue_date DATE,
    credential_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. STUDENT PREFERENCES
CREATE TABLE IF NOT EXISTS student_preferences (
    student_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    target_roles TEXT[] DEFAULT '{}',
    preferred_skills TEXT[] DEFAULT '{}',
    preferred_locations TEXT[] DEFAULT '{}',
    work_mode_preference TEXT[] DEFAULT '{}',
    min_stipend VARCHAR(100),
    max_duration_months INTEGER,
    auto_apply_enabled BOOLEAN DEFAULT FALSE,
    auto_apply_settings JSONB DEFAULT '{"match_threshold": 80, "max_weekly_apps": 5, "require_approval": true}'::jsonb,
    notification_preferences JSONB DEFAULT '{"email": true, "in_app": true}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. STUDENT DOCUMENTS (Resumes, Portfolios)
CREATE TABLE IF NOT EXISTS student_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    document_type VARCHAR(50) DEFAULT 'resume' CHECK (document_type IN ('resume', 'portfolio', 'transcript', 'other')),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    parsed_content TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. APPLICATIONS TABLE
-- MANDATORY RULE ENFORCEMENT: A student cannot apply to the same internship more than once
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'applied' CHECK (status IN (
        'applied',
        'under_review',
        'shortlisted',
        'interview_scheduled',
        'selected',
        'rejected',
        'withdrawn'
    )),
    resume_url TEXT,
    answers JSONB DEFAULT '{}'::jsonb,
    cover_letter TEXT,
    match_score NUMERIC(5, 2),
    match_analysis JSONB DEFAULT '{}'::jsonb,
    submission_timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    final_decision_timestamp TIMESTAMPTZ,
    -- Non-negotiable key constraint
    CONSTRAINT unique_student_internship UNIQUE (student_id, internship_id)
);

-- 11. APPLICATION STATUS HISTORY
CREATE TABLE IF NOT EXISTS application_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    previous_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    changed_by UUID NOT NULL REFERENCES profiles(id),
    change_timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    reason TEXT
);

-- 12. APPLICATION TAILORED DOCUMENTS
CREATE TABLE IF NOT EXISTS application_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    doc_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. INTERVIEWS TABLE
CREATE TABLE IF NOT EXISTS interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    interviewer_id UUID NOT NULL REFERENCES profiles(id),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    interview_mode VARCHAR(20) DEFAULT 'video' CHECK (interview_mode IN ('video', 'in-person', 'phone')),
    meeting_url TEXT,
    interview_status VARCHAR(20) DEFAULT 'scheduled' CHECK (interview_status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    candidate_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 14. INTERVIEW SLOTS (For recruiter availability and student self-scheduling)
CREATE TABLE IF NOT EXISTS interview_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recruiter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    is_booked BOOLEAN DEFAULT FALSE,
    booked_by_application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. INTERVIEW FEEDBACK (Recruiter job-related evaluation)
CREATE TABLE IF NOT EXISTS interview_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    interview_id UUID NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    evaluator_id UUID NOT NULL REFERENCES profiles(id),
    technical_rating INTEGER CHECK (technical_rating BETWEEN 1 AND 5),
    communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
    problem_solving_rating INTEGER CHECK (problem_solving_rating BETWEEN 1 AND 5),
    overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
    notes TEXT,
    recommendation VARCHAR(30) CHECK (recommendation IN ('strong_hire', 'hire', 'neutral', 'no_hire')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 16. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 17. AGENT RUNS (Workflow execution audits)
CREATE TABLE IF NOT EXISTS agent_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    agent_type VARCHAR(50) NOT NULL CHECK (agent_type IN (
        'hunter_agent',
        'personalization_agent',
        'execution_agent',
        'guard_agent',
        'career_ops_agent'
    )),
    status VARCHAR(20) DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
    trigger_type VARCHAR(20) DEFAULT 'manual' CHECK (trigger_type IN ('manual', 'auto', 'scheduled')),
    input_summary JSONB DEFAULT '{}'::jsonb,
    output_summary JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    completed_at TIMESTAMPTZ
);

-- 18. GENERATED DOCUMENTS
CREATE TABLE IF NOT EXISTS generated_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
    doc_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- INDEXES FOR HIGH-PERFORMANCE QUERYING
CREATE INDEX IF NOT EXISTS idx_internships_status_deadline ON internships (status, application_deadline);
CREATE INDEX IF NOT EXISTS idx_internships_company_id ON internships (company_id);
CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications (student_id);
CREATE INDEX IF NOT EXISTS idx_applications_internship_id ON applications (internship_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications (status);
CREATE INDEX IF NOT EXISTS idx_status_history_application ON application_status_history (application_id);
CREATE INDEX IF NOT EXISTS idx_interviews_application_id ON interviews (application_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications (recipient_id, read);
CREATE INDEX IF NOT EXISTS idx_agent_runs_user ON agent_runs (user_id, agent_type);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_documents ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view their own profile, recruiters can view student profiles who applied
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Internships: Public can view published internships; Recruiters can manage company listings
CREATE POLICY "Anyone can view published internships" ON internships
    FOR SELECT USING (status = 'published');

CREATE POLICY "Recruiters manage company internships" ON internships
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM company_members
            WHERE company_members.company_id = internships.company_id
              AND company_members.user_id = auth.uid()
        )
    );

-- Applications: Students can view/insert their own applications; Recruiters can view applications for their company's internships
CREATE POLICY "Students manage own applications" ON applications
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students insert own applications" ON applications
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Recruiters view applications for their internships" ON applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM internships
            JOIN company_members ON company_members.company_id = internships.company_id
            WHERE internships.id = applications.internship_id
              AND company_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Recruiters update application status" ON applications
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM internships
            JOIN company_members ON company_members.company_id = internships.company_id
            WHERE internships.id = applications.internship_id
              AND company_members.user_id = auth.uid()
        )
    );

-- Notifications: Only recipient can view/update
CREATE POLICY "Users view own notifications" ON notifications
    FOR ALL USING (auth.uid() = recipient_id);

