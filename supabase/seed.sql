-- InternBridge Synthetic Seed Data
-- Demonstrates full workflow with students, recruiters, companies, internships, applications, and interviews

-- 1. COMPANIES
INSERT INTO companies (id, name, description, website, industry, location, status) VALUES
('c1000000-0000-0000-0000-000000000001', 'CloudScale Technologies', 'Enterprise cloud infrastructure and distributed systems engineering.', 'https://cloudscale.example.com', 'Cloud Computing & DevOps', 'Bengaluru, India', 'active'),
('c2000000-0000-0000-0000-000000000002', 'Nova Health AI', 'Next-generation clinical intelligence and biomedical machine learning platform.', 'https://novahealth.example.com', 'Healthcare AI & Biotech', 'Hyderabad, India (Remote-friendly)', 'active'),
('c3000000-0000-0000-0000-000000000003', 'FinEdge Global', 'High-frequency algorithmic trading and resilient financial ledger systems.', 'https://finedge.example.com', 'FinTech & Quantitative Finance', 'Mumbai, India', 'active')
ON CONFLICT (id) DO NOTHING;

-- 2. PROFILES
-- Demo Students
INSERT INTO profiles (id, role, full_name, email, education, degree, department, graduation_year, gpa, location, professional_summary, preferences) VALUES
('s1000000-0000-0000-0000-000000000001', 'student', 'Priya Sharma', 'priya.sharma@example.edu', 'National Institute of Technology', 'B.Tech', 'Computer Science and Engineering', 2026, 8.85, 'Bengaluru, India', 'Full-stack software engineering student specializing in distributed systems, TypeScript, React, and Python. Passionate about cloud performance.', '{"target_roles": ["Full Stack Engineer", "Cloud Software Engineer", "Backend Developer"], "work_modes": ["remote", "hybrid"]}'::jsonb),
('s2000000-0000-0000-0000-000000000002', 'student', 'Rohan Mehta', 'rohan.mehta@example.edu', 'Indian Institute of Technology', 'B.Tech', 'Data Science & AI', 2026, 9.10, 'Hyderabad, India', 'ML practitioner experienced with PyTorch, NLP, and model serving. Built end-to-end inference pipelines on Kubernetes.', '{"target_roles": ["Machine Learning Engineer", "AI Research Intern"], "work_modes": ["remote"]}'::jsonb),
('s3000000-0000-0000-0000-000000000003', 'student', 'Ananya Iyer', 'ananya.iyer@example.edu', 'Birla Institute of Technology and Science', 'B.E.', 'Electronics & Computer Science', 2027, 8.40, 'Pune, India', 'Frontend engineer focused on accessible, high-performance web applications and UI design systems.', '{"target_roles": ["Frontend Engineer", "Product Designer"], "work_modes": ["in-office", "hybrid"]}'::jsonb),
-- Demo Recruiters
('r1000000-0000-0000-0000-000000000001', 'recruiter', 'Alex Rivera', 'alex.rivera@cloudscale.example.com', 'University of Washington', 'M.S.', 'Information Management', 2018, NULL, 'Bengaluru, India', 'Lead Technical Recruiter at CloudScale. Hiring future cloud builders.', '{}'::jsonb),
('r2000000-0000-0000-0000-000000000002', 'recruiter', 'Marcus Vance', 'marcus.vance@novahealth.example.com', 'Georgia Tech', 'M.S.', 'Human-Computer Interaction', 2017, NULL, 'Hyderabad, India', 'Talent Partner at Nova Health AI. Building world-class biomedical AI engineering teams.', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 3. COMPANY MEMBERS
INSERT INTO company_members (id, company_id, user_id, role, membership_status) VALUES
('cm100000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'r1000000-0000-0000-0000-000000000001', 'admin', 'active'),
('cm200000-0000-0000-0000-000000000002', 'c2000000-0000-0000-0000-000000000002', 'r2000000-0000-0000-0000-000000000002', 'admin', 'active')
ON CONFLICT (id) DO NOTHING;

-- 4. INTERNSHIPS
INSERT INTO internships (id, company_id, created_by, title, description, responsibilities, required_skills, preferred_skills, eligibility_rules, minimum_gpa, accepted_graduation_years, location, work_mode, duration, stipend, application_deadline, status, openings_count) VALUES
('i1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'r1000000-0000-0000-0000-000000000001',
'Cloud Infrastructure & Backend Engineering Intern',
'Join CloudScale Technologies to design, build, and optimize high-throughput distributed microservices on modern cloud infrastructure. You will collaborate with staff engineers on latency reduction and automated failover pipelines.',
'1. Implement and benchmark REST/gRPC microservices in Go or Node.js.\n2. Write automated integration test suites and Terraform modules.\n3. Optimize PostgreSQL query execution plans and caching policies.',
ARRAY['Go', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
ARRAY['Kubernetes', 'Redis', 'AWS', 'GraphQL'],
'{"min_gpa": 7.5, "allowed_degrees": ["B.Tech", "B.E.", "M.Tech"], "allowed_years": [2026, 2027]}'::jsonb,
7.50,
ARRAY[2026, 2027],
'Bengaluru, India',
'hybrid',
'6 Months',
'₹55,000 / month',
NOW() + INTERVAL '30 days',
'published',
3),

('i2000000-0000-0000-0000-000000000002', 'c2000000-0000-0000-0000-000000000002', 'r2000000-0000-0000-0000-000000000002',
'Applied AI & Machine Learning Research Intern',
'Nova Health AI is seeking passionate ML interns to develop clinical diagnostic assistance models and biomedical NLP processing pipelines. You will work on privacy-preserving model tuning and clinical validation.',
'1. Fine-tune open-source foundation models on structured clinical datasets.\n2. Design evaluation benchmarks for retrieval-augmented generation.\n3. Implement model quantizations and low-latency API serving.',
ARRAY['Python', 'PyTorch', 'Machine Learning', 'NLP', 'FastAPI'],
ARRAY['Hugging Face', 'Docker', 'MLflow', 'RAG'],
'{"min_gpa": 8.0, "allowed_degrees": ["B.Tech", "M.Tech", "M.S."], "allowed_years": [2026, 2027]}'::jsonb,
8.00,
ARRAY[2026, 2027],
'Remote',
'remote',
'6 Months',
'₹60,000 / month',
NOW() + INTERVAL '25 days',
'published',
2),

('i3000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'r1000000-0000-0000-0000-000000000001',
'Frontend Platform & Design Systems Intern',
'Collaborate with our product design and platform team to build accessible, fluid, and robust UI primitives used across CloudScale dashboards and analytics tooling.',
'1. Develop component libraries using React 19, TypeScript, and Tailwind CSS.\n2. Ensure WCAG 2.1 AA accessibility compliance and keyboard navigation.\n3. Profile frontend render speeds and bundle footprints.',
ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
ARRAY['Framer Motion', 'Storybook', 'Web Vitals'],
'{"min_gpa": 7.0, "allowed_degrees": ["B.Tech", "B.E.", "B.Sc", "BCA"], "allowed_years": [2026, 2027, 2028]}'::jsonb,
7.00,
ARRAY[2026, 2027, 2028],
'Bengaluru, India',
'in-office',
'3 Months',
'₹40,000 / month',
NOW() + INTERVAL '15 days',
'published',
2),

('i4000000-0000-0000-0000-000000000004', 'c3000000-0000-0000-0000-000000000003', 'r1000000-0000-0000-0000-000000000001',
'Quantitative Systems & Algorithmic Trading Intern',
'Build ultra-low latency market data processors and execution order routers for global financial markets.',
'1. Optimize C++20 and Python multi-threaded order queue handlers.\n2. Run historical backtesting on high-frequency market tick data.',
ARRAY['Python', 'C++', 'Data Structures', 'Algorithms'],
ARRAY['Linux Kernel', 'Sockets', 'Pandas'],
'{"min_gpa": 8.5, "allowed_degrees": ["B.Tech", "B.E."], "allowed_years": [2026]}'::jsonb,
8.50,
ARRAY[2026],
'Mumbai, India',
'in-office',
'6 Months',
'₹75,000 / month',
NOW() + INTERVAL '45 days',
'published',
1)
ON CONFLICT (id) DO NOTHING;

-- 5. STUDENT SKILLS
INSERT INTO student_skills (student_id, skill_name, proficiency_level, verified) VALUES
('s1000000-0000-0000-0000-000000000001', 'TypeScript', 'expert', true),
('s1000000-0000-0000-0000-000000000001', 'Node.js', 'advanced', true),
('s1000000-0000-0000-0000-000000000001', 'PostgreSQL', 'advanced', true),
('s1000000-0000-0000-0000-000000000001', 'Docker', 'intermediate', false),
('s1000000-0000-0000-0000-000000000001', 'React', 'advanced', true),
('s2000000-0000-0000-0000-000000000002', 'Python', 'expert', true),
('s2000000-0000-0000-0000-000000000002', 'PyTorch', 'expert', true),
('s2000000-0000-0000-0000-000000000002', 'Machine Learning', 'advanced', true),
('s2000000-0000-0000-0000-000000000002', 'FastAPI', 'intermediate', true)
ON CONFLICT DO NOTHING;

-- 6. STUDENT PROJECTS
INSERT INTO student_projects (id, student_id, title, description, technologies, repo_url, live_url, featured) VALUES
('p1000000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000001',
'Distributed Task Queue Engine',
'High-throughput asynchronous task worker queue with Redis backing, exponential backoff retries, and dead-letter queue inspection dashboard.',
ARRAY['TypeScript', 'Node.js', 'Redis', 'Docker'],
'https://github.com/priyasharma/dist-task-queue',
'https://task-engine-demo.dev',
true),
('p2000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000001',
'Real-Time Collaborative Code Editor',
'WebRTC and operational transformation powered in-browser code editor with multi-user cursors and syntax highlighting.',
ARRAY['React', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
'https://github.com/priyasharma/collab-code',
'https://collab-code.dev',
true)
ON CONFLICT (id) DO NOTHING;

-- 7. STUDENT PREFERENCES
INSERT INTO student_preferences (student_id, target_roles, preferred_skills, preferred_locations, work_mode_preference, min_stipend, max_duration_months, auto_apply_enabled, auto_apply_settings) VALUES
('s1000000-0000-0000-0000-000000000001',
ARRAY['Cloud Infrastructure Engineer', 'Full Stack Engineer', 'Backend Engineer'],
ARRAY['TypeScript', 'Go', 'PostgreSQL', 'Docker'],
ARRAY['Bengaluru', 'Remote'],
ARRAY['hybrid', 'remote'],
'₹40,000',
6,
true,
'{"match_threshold": 80, "max_weekly_apps": 5, "require_approval": true}'::jsonb)
ON CONFLICT (student_id) DO NOTHING;

-- 8. APPLICATIONS (Enforcing exactly one application per student per internship)
INSERT INTO applications (id, student_id, internship_id, status, resume_url, answers, cover_letter, match_score, match_analysis, submission_timestamp) VALUES
('a1000000-0000-0000-0000-000000000001',
's1000000-0000-0000-0000-000000000001',
'i1000000-0000-0000-0000-000000000001',
'shortlisted',
'https://storage.internbridge.internal/resumes/priya_sharma_cloudscale.pdf',
'{"why_company": "CloudScale handles scale challenges that align with my distributed queue project.", "notice_period": "Available immediately"}'::jsonb,
'Dear CloudScale Hiring Team, I am writing to express my strong enthusiasm for the Cloud Infrastructure & Backend Engineering Internship. Having developed a distributed task queue engine handling 10k ops/sec with Redis and Docker, I am excited to apply my skills to your distributed microservices stack.',
92.50,
'{"matching_skills": ["TypeScript", "Node.js", "PostgreSQL", "Docker"], "missing_skills": ["Go", "Kubernetes"], "eligibility_passed": true, "reason": "Strong match in backend engineering and relational database design. GPA 8.85 exceeds the 7.50 requirement."}'::jsonb,
NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- 9. APPLICATION STATUS HISTORY
INSERT INTO application_status_history (id, application_id, previous_status, new_status, changed_by, change_timestamp, reason) VALUES
('h1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', NULL, 'applied', 's1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '3 days', 'Application submitted by candidate via InternBridge portal.'),
('h2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'applied', 'under_review', 'r1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '2 days', 'Candidate resume and project portfolio under technical team review.'),
('h3000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'under_review', 'shortlisted', 'r1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '1 day', 'Candidate demonstrates exceptional distributed systems knowledge and exceeds GPA threshold.')
ON CONFLICT (id) DO NOTHING;

-- 10. INTERVIEW SLOTS & SCHEDULED INTERVIEWS
INSERT INTO interview_slots (id, recruiter_id, company_id, start_time, end_time, timezone, is_booked, booked_by_application_id) VALUES
('isl10000-0000-0000-0000-000000000001', 'r1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '45 minutes', 'IST', true, 'a1000000-0000-0000-0000-000000000001'),
('isl20000-0000-0000-0000-000000000002', 'r1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days' + INTERVAL '45 minutes', 'IST', false, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO interviews (id, application_id, interviewer_id, start_time, end_time, timezone, interview_mode, meeting_url, interview_status, candidate_instructions) VALUES
('int10000-0000-0000-0000-000000000001',
'a1000000-0000-0000-0000-000000000001',
'r1000000-0000-0000-0000-000000000001',
NOW() + INTERVAL '2 days',
NOW() + INTERVAL '2 days' + INTERVAL '45 minutes',
'Asia/Kolkata',
'video',
'https://meet.internbridge.internal/cloudscale-technical-interview-902',
'scheduled',
'Technical architectural discussion on distributed queues, database indexing, and your project portfolio. Please have your code editor ready.')
ON CONFLICT (id) DO NOTHING;

-- 11. NOTIFICATIONS
INSERT INTO notifications (id, recipient_id, type, title, message, link, read) VALUES
('n1000000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000001', 'application_status', 'Application Shortlisted 🎉', 'Your application for Cloud Infrastructure & Backend Engineering Intern has been shortlisted by CloudScale Technologies.', '/student/applications/a1000000-0000-0000-0000-000000000001', false),
('n2000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000001', 'interview_scheduled', 'Technical Interview Scheduled', 'Your interview with Alex Rivera is confirmed for 2 days from now. Access the AI Prep Workspace to get ready!', '/student/interviews', false),
('n3000000-0000-0000-0000-000000000003', 'r1000000-0000-0000-0000-000000000001', 'new_application', 'New Candidate Application', 'Priya Sharma applied for Cloud Infrastructure & Backend Engineering Intern with a 92.5% compatibility score.', '/recruiter/applicants/a1000000-0000-0000-0000-000000000001', true)
ON CONFLICT (id) DO NOTHING;

-- 12. AGENT RUNS
INSERT INTO agent_runs (id, user_id, agent_type, status, trigger_type, input_summary, output_summary, started_at, completed_at) VALUES
('ar100000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000001', 'hunter_agent', 'completed', 'manual',
'{"student_skills": ["TypeScript", "Node.js", "PostgreSQL", "Docker"], "gpa": 8.85}'::jsonb,
'{"recommendations_count": 3, "top_match": "Cloud Infrastructure & Backend Engineering Intern (92.5%)"}'::jsonb,
NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '3 seconds'),
('ar200000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000001', 'guard_agent', 'completed', 'auto',
'{"internship_id": "i1000000-0000-0000-0000-000000000001", "student_id": "s1000000-0000-0000-0000-000000000001"}'::jsonb,
'{"status": "passed", "duplicate_check": "no_duplicate", "deadline_check": "valid", "eligibility_check": "passed"}'::jsonb,
NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '1 second')
ON CONFLICT (id) DO NOTHING;

