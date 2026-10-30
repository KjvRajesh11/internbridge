// InternBridge Core Domain Types & Data Contracts

export type UserRole = 'student' | 'recruiter' | 'admin';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  phone?: string;
  education?: string;
  degree?: string;
  department?: string;
  graduation_year?: number;
  gpa?: number;
  location?: string;
  professional_summary?: string;
  preferences?: Record<string, unknown>;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website?: string;
  industry: string;
  location: string;
  logo_url?: string;
  status: 'active' | 'pending_verification' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface CompanyMember {
  id: string;
  company_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'recruiter' | 'hiring_manager';
  membership_status: 'active' | 'invited' | 'inactive';
  created_at: string;
}

export type WorkMode = 'remote' | 'hybrid' | 'in-office';
export type InternshipStatus = 'draft' | 'published' | 'closed' | 'archived';

export interface EligibilityRules {
  min_gpa?: number;
  allowed_degrees?: string[];
  allowed_years?: number[];
  required_department?: string[];
}

export interface Internship {
  id: string;
  company_id: string;
  company?: Company;
  created_by: string;
  title: string;
  description: string;
  responsibilities: string;
  required_skills: string[];
  preferred_skills: string[];
  eligibility_rules: EligibilityRules;
  minimum_gpa: number;
  accepted_graduation_years: number[];
  location: string;
  work_mode: WorkMode;
  duration: string;
  stipend: string;
  application_deadline: string;
  status: InternshipStatus;
  openings_count: number;
  created_at: string;
  updated_at: string;
}

export interface StudentSkill {
  id: string;
  student_id: string;
  skill_name: string;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verified: boolean;
  created_at: string;
}

export interface StudentProject {
  id: string;
  student_id: string;
  title: string;
  description: string;
  technologies: string[];
  repo_url?: string;
  live_url?: string;
  featured: boolean;
  created_at: string;
}

export interface StudentCertification {
  id: string;
  student_id: string;
  name: string;
  issuing_org: string;
  issue_date?: string;
  credential_url?: string;
  created_at: string;
}

export interface AutoApplySettings {
  match_threshold: number;
  max_weekly_apps: number;
  require_approval: boolean;
  allowed_modes?: WorkMode[];
}

export interface StudentPreferences {
  student_id: string;
  target_roles: string[];
  preferred_skills: string[];
  preferred_locations: string[];
  work_mode_preference: WorkMode[];
  min_stipend?: string;
  max_duration_months?: number;
  auto_apply_enabled: boolean;
  auto_apply_settings: AutoApplySettings;
  notification_preferences: {
    email: boolean;
    in_app: boolean;
  };
  updated_at: string;
}

export interface StudentDocument {
  id: string;
  student_id: string;
  document_type: 'resume' | 'portfolio' | 'transcript' | 'other';
  file_name: string;
  file_url: string;
  file_size?: number;
  parsed_content?: string;
  is_primary: boolean;
  created_at: string;
}

export type ApplicationStatus =
  | 'applied'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'selected'
  | 'rejected'
  | 'withdrawn';

export interface MatchAnalysis {
  compatibility_score: number;
  matching_skills: string[];
  missing_skills: string[];
  eligibility_passed: boolean;
  reasons: string[];
  breakdown: {
    required_skills_pct: number;
    preferred_skills_pct: number;
    role_alignment_pct: number;
    education_alignment_pct: number;
    location_alignment_pct: number;
  };
}

export interface Application {
  id: string;
  student_id: string;
  student?: Profile;
  internship_id: string;
  internship?: Internship;
  status: ApplicationStatus;
  resume_url?: string;
  answers: Record<string, string>;
  cover_letter?: string;
  match_score?: number;
  match_analysis?: MatchAnalysis;
  submission_timestamp: string;
  updated_at: string;
  final_decision_timestamp?: string;
}

export interface ApplicationStatusHistory {
  id: string;
  application_id: string;
  previous_status?: ApplicationStatus;
  new_status: ApplicationStatus;
  changed_by: string;
  changed_by_profile?: Profile;
  change_timestamp: string;
  reason?: string;
}

export type InterviewMode = 'video' | 'in-person' | 'phone';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface Interview {
  id: string;
  application_id: string;
  application?: Application;
  interviewer_id: string;
  interviewer?: Profile;
  start_time: string;
  end_time: string;
  timezone: string;
  interview_mode: InterviewMode;
  meeting_url?: string;
  interview_status: InterviewStatus;
  candidate_instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface InterviewSlot {
  id: string;
  recruiter_id: string;
  company_id: string;
  start_time: string;
  end_time: string;
  timezone: string;
  is_booked: boolean;
  booked_by_application_id?: string;
  created_at: string;
}

export interface InterviewFeedback {
  id: string;
  interview_id: string;
  application_id: string;
  evaluator_id: string;
  technical_rating: number; // 1-5
  communication_rating: number; // 1-5
  problem_solving_rating: number; // 1-5
  overall_rating: number; // 1-5
  notes: string;
  recommendation: 'strong_hire' | 'hire' | 'neutral' | 'no_hire';
  created_at: string;
}

export interface NotificationItem {
  id: string;
  recipient_id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: string;
}

export type AgentType =
  | 'hunter_agent'
  | 'personalization_agent'
  | 'execution_agent'
  | 'guard_agent'
  | 'career_ops_agent';

export interface AgentRun {
  id: string;
  user_id: string;
  agent_type: AgentType;
  status: 'running' | 'completed' | 'failed';
  trigger_type: 'manual' | 'auto' | 'scheduled';
  input_summary: Record<string, unknown>;
  output_summary: Record<string, unknown>;
  error_message?: string;
  started_at: string;
  completed_at?: string;
}

export interface GeneratedDocument {
  id: string;
  student_id: string;
  application_id?: string;
  doc_type: 'cover_letter' | 'tailored_resume' | 'qa_answers' | 'prep_sheet';
  title: string;
  content: string;
  approved: boolean;
  created_at: string;
}

