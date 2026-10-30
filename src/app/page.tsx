import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  Shield,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Lock,
  Search,
  Zap,
  Target,
  FileCheck,
  TrendingUp,
  Clock,
  Compass,
  ArrowUpRight,
  Calendar,
  Check,
} from 'lucide-react';
import { db } from '@/lib/storage/db';
import { StatusBadge } from '@/components/StatusBadge';

export default function HomePage() {
  const publishedInternships = db.getInternships({ status: 'published' });
  const internships = publishedInternships.slice(0, 3);
  const totalOpenings = publishedInternships.length;
  const totalApplications = db.applications.size;

  return (
    <div className="flex-1 flex flex-col bg-white text-[#0A0A0A]">
      {/* ========================================================
          HERO SECTION — EDITORIAL TYPOGRAPHY & INTERFACE COMPOSITION
          ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#DEDEDE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Editorial Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0A0A0A] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E42316]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A] font-bold">
                AUTONOMOUS EARLY-CAREER INFRASTRUCTURE
              </span>
            </div>
            <span className="font-mono text-xs text-[#777777] uppercase tracking-wider">
              ISSUE 03 // ACADEMIC &amp; ENTERPRISE RELEASE
            </span>
          </div>

          {/* Oversized Headline */}
          <div className="space-y-6 max-w-5xl">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-[#0A0A0A] uppercase leading-[0.92]">
              YOUR <span className="text-[#E42316]">NEXT CAREER</span>
              <br />
              STARTS HERE.
            </h1>

            <p className="text-lg sm:text-2xl text-[#777777] font-light max-w-2xl leading-relaxed">
              Discover meaningful internships, prepare smarter applications, and move through your career journey with AI working alongside you.
            </p>

            {/* Clear Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/internships"
                className="px-8 py-4 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2"
              >
                <span>Explore Internships</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/features"
                className="px-8 py-4 border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2"
              >
                <span>Meet Your AI Agents</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* High-Contrast Asymmetrical Product Interface Composition */}
          <div className="pt-8">
            <div className="border-2 border-[#0A0A0A] bg-[#F4F4F2] p-6 lg:p-8">
              <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#0A0A0A]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A] font-bold">
                    LIVE SYSTEM SIMULATION // STUDENT &amp; RECRUITER STATE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#E42316] font-bold">ALL 5 AGENTS OPERATIONAL</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Panel 1: Internship Match Card */}
                <div className="md:col-span-5 bg-white border border-[#DEDEDE] p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#E42316] font-bold bg-[#F4F4F2] px-2 py-0.5 border border-[#DEDEDE]">
                      AGENT 1 MATCH: 94%
                    </span>
                    <span className="font-mono text-[11px] text-[#777777]">CloudScale Tech</span>
                  </div>

                  <h3 className="text-xl font-black text-[#0A0A0A] uppercase tracking-tight">
                    Distributed Systems Intern
                  </h3>

                  <p className="text-xs text-[#777777] leading-relaxed">
                    High-throughput event streaming, raft consensus, and containerized microservices in Go &amp; Kubernetes.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Go', 'Kubernetes', 'Docker', 'Distributed Systems'].map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-[#F4F4F2] border border-[#DEDEDE] font-mono text-[10px] text-[#0A0A0A]">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-[#DEDEDE] pt-3 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#0A0A0A] font-bold">$42/hr Stipend</span>
                    <span className="text-[#777777]">San Francisco • Hybrid</span>
                  </div>
                </div>

                {/* Panel 2: Tailored Application Preview */}
                <div className="md:col-span-4 bg-white border border-[#DEDEDE] p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#0A0A0A] font-bold">
                      AGENT 2 FACTUAL PITCH
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#E42316]" />
                  </div>

                  <div className="border-l-2 border-[#E42316] pl-3 py-1 font-serif text-xs text-[#0A0A0A] italic leading-relaxed">
                    &ldquo;In my open-source distributed task queue project, I implemented exponential backoff retries and benchmarked 12,000 tasks/sec with Redis.&rdquo;
                  </div>

                  <div className="space-y-1.5 font-mono text-[10px] text-[#777777] border-t border-[#DEDEDE] pt-3">
                    <div className="flex items-center gap-1.5 text-[#0A0A0A]">
                      <Check className="w-3 h-3 text-[#E42316]" />
                      <span>100% Grounded in Candidate Projects</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#0A0A0A]">
                      <Check className="w-3 h-3 text-[#E42316]" />
                      <span>Zero Fabricated Grades or Metrics</span>
                    </div>
                  </div>
                </div>

                {/* Panel 3: Timeline & Interview Alert */}
                <div className="md:col-span-3 space-y-4">
                  {/* Progress Timeline */}
                  <div className="bg-[#0A0A0A] text-white p-5 space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#E42316] font-bold block">
                      PIPELINE STAGE
                    </span>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[#777777]">
                        <span>01. Applied</span>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex items-center justify-between text-[#777777]">
                        <span>02. Reviewing</span>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex items-center justify-between text-white font-bold">
                        <span className="text-[#E42316]">03. Shortlisted</span>
                        <span className="w-2 h-2 rounded-full bg-[#E42316]" />
                      </div>
                      <div className="flex items-center justify-between text-[#777777]">
                        <span>04. Interview</span>
                        <span className="text-[10px]">—</span>
                      </div>
                    </div>
                  </div>

                  {/* Interview Reminder */}
                  <div className="bg-white border-2 border-[#0A0A0A] p-4 space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#777777] block">
                      SCHEDULED SESSION
                    </span>
                    <div className="font-bold text-xs text-[#0A0A0A]">Technical Rehearsal Round</div>
                    <div className="font-mono text-[11px] text-[#E42316]">Tomorrow at 10:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          RED TRANSITION DIVIDER & MANDATE BANNER
          ======================================================== */}
      <div className="bg-[#E42316] text-white py-4 px-4 sm:px-6 lg:px-8 border-y-2 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-xs tracking-wider">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-black text-white font-bold text-[10px] uppercase">RULE ENFORCED</span>
            <span className="font-bold uppercase">
              A student cannot apply to the same internship more than once.
            </span>
          </div>
          <span className="text-white/80 text-[11px] uppercase">
            UNIQUE(STUDENT_ID, INTERNSHIP_ID) // DATABASE SCHEMA LEVEL
          </span>
        </div>
      </div>

      {/* ========================================================
          DARK PRODUCT SHOWCASE — NEAR-BLACK ASYMMETRICAL GRID
          ======================================================== */}
      <section className="bg-[#0A0A0A] text-white py-24 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
              <span className="w-2 h-2 bg-[#E42316]" />
              <span>CAPABILITIES SUITE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[0.95]">
              AUTONOMOUS INFRASTRUCTURE BUILT FOR <span className="text-[#E42316]">HIGH-TRUST HIRING</span>.
            </h2>
            <p className="text-sm sm:text-base text-[#777777] font-light leading-relaxed">
              We separate deterministic data validation from generative AI. Candidates receive intelligent workflow assistance, while recruiters receive untampered, verifiable applicant dossiers.
            </p>
          </div>

          {/* 6 Capabilities in an Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <div className="border border-[#222222] bg-[#151515] p-8 space-y-4 hover:border-[#E42316] transition-colors">
              <div className="font-mono text-xs text-[#E42316] font-bold">01 // DISCOVERY</div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Intelligent Internship Matching
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Deterministic multi-factor matching across required skills (40%), preferred skills (20%), target roles (15%), academic cutoffs (10%), and location (10%).
              </p>
              <div className="font-mono text-[10px] text-[#DEDEDE] border-t border-[#222222] pt-3">
                &gt; Weighted transparent compatibility scoring
              </div>
            </div>

            {/* Capability 2 */}
            <div className="border border-[#222222] bg-[#151515] p-8 space-y-4 hover:border-[#E42316] transition-colors">
              <div className="font-mono text-xs text-[#E42316] font-bold">02 // PREPARATION</div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                AI-Assisted Application Personalization
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Synthesizes role-aligned cover letters and screening responses referencing strictly candidate-verified GitHub repositories and technical achievements.
              </p>
              <div className="font-mono text-[10px] text-[#DEDEDE] border-t border-[#222222] pt-3">
                &gt; Zero hallucinations • Factual integrity guard
              </div>
            </div>

            {/* Capability 3 */}
            <div className="border border-[#222222] bg-[#151515] p-8 space-y-4 hover:border-[#E42316] transition-colors">
              <div className="font-mono text-xs text-[#E42316] font-bold">03 // EXECUTION</div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Authorized Autonomous Submission
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Atomic internal application dispatch with configurable weekly student application limits and mandatory pre-submission eligibility verification.
              </p>
              <div className="font-mono text-[10px] text-[#DEDEDE] border-t border-[#222222] pt-3">
                &gt; Assisted review or authorized auto-apply
              </div>
            </div>

            {/* Capability 4 */}
            <div className="border border-[#222222] bg-[#151515] p-8 space-y-4 hover:border-[#E42316] transition-colors">
              <div className="font-mono text-xs text-[#E42316] font-bold">04 // TRACKING</div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Real-Time Application Tracking
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Lifecycle telemetry across 6 distinct stages. Calculates stage dwell times and flags applications exceeding 7 days in review with tailored follow-up drafts.
              </p>
              <div className="font-mono text-[10px] text-[#DEDEDE] border-t border-[#222222] pt-3">
                &gt; Immutable status transition audit log
              </div>
            </div>

            {/* Capability 5 */}
            <div className="border border-[#222222] bg-[#151515] p-8 space-y-4 hover:border-[#E42316] transition-colors">
              <div className="font-mono text-xs text-[#E42316] font-bold">05 // CALENDAR</div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Conflict-Free Interview Scheduling
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Explicit recruiter availability slots with atomic database locking to eliminate double-booking. Automatic meeting link distribution.
              </p>
              <div className="font-mono text-[10px] text-[#DEDEDE] border-t border-[#222222] pt-3">
                &gt; Atomic locking • Zero schedule collision
              </div>
            </div>

            {/* Capability 6 */}
            <div className="border border-[#222222] bg-[#151515] p-8 space-y-4 hover:border-[#E42316] transition-colors">
              <div className="font-mono text-xs text-[#E42316] font-bold">06 // WORKSPACE</div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                Recruiter Candidate Management
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Job-related scorecards (Technical, Problem Solving, Communication), Kanban stage progression, and clean candidate profiles free from duplicate spam.
              </p>
              <div className="font-mono text-[10px] text-[#DEDEDE] border-t border-[#222222] pt-3">
                &gt; Structured evaluation • RLS data privacy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERNSHIP DISCOVERY SECTION — CLEAN WHITE WORKSPACE
          ======================================================== */}
      <section className="py-20 bg-white border-b border-[#DEDEDE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#0A0A0A] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
                ACTIVE OPPORTUNITY BROWSER
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0A0A0A] uppercase tracking-tight mt-1">
                FEATURED OPENINGS
              </h2>
            </div>

            <Link
              href="/internships"
              className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A] hover:text-[#E42316] font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>View All ({totalOpenings}) Listings</span>
              <ArrowRight className="w-4 h-4 text-[#E42316]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internships.map((intern) => (
              <div
                key={intern.id}
                className="bg-white border-2 border-[#DEDEDE] hover:border-[#0A0A0A] p-6 flex flex-col justify-between transition-colors space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-[#DEDEDE] pb-3">
                    <span className="font-mono text-xs font-bold text-[#0A0A0A] uppercase">
                      {intern.company?.name}
                    </span>
                    <StatusBadge status={intern.work_mode} size="sm" />
                  </div>

                  <Link href={`/internships/${intern.id}`} className="block group">
                    <h3 className="text-lg font-black text-[#0A0A0A] uppercase tracking-tight group-hover:text-[#E42316] transition-colors leading-snug">
                      {intern.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#777777] line-clamp-3 leading-relaxed">
                    {intern.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {intern.required_skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#F4F4F2] border border-[#DEDEDE] font-mono text-[10px] text-[#0A0A0A]"
                      >
                        {skill}
                      </span>
                    ))}
                    {intern.required_skills.length > 3 && (
                      <span className="font-mono text-[10px] text-[#777777] self-center">
                        +{intern.required_skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#DEDEDE] pt-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#777777] block uppercase">Stipend</span>
                    <span className="font-mono text-xs font-bold text-[#0A0A0A]">{intern.stipend}</span>
                  </div>

                  <Link
                    href={`/internships/${intern.id}`}
                    className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
                  >
                    View Role
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          AI AGENTS SECTION — DISTINCTIVE 5-AGENT ARCHITECTURE
          ======================================================== */}
      <section className="py-24 bg-[#F4F4F2] border-b border-[#DEDEDE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
              THE COORDINATED MULTI-AGENT PIPELINE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.95]">
              FIVE SPECIALIZED AGENTS. <span className="text-[#E42316]">ZERO HALLUCINATIONS</span>.
            </h2>
            <p className="text-sm sm:text-base text-[#777777] font-light leading-relaxed">
              Every agent has a single, testable responsibility. Together they automate opportunity discovery, application preparation, and interview rehearsal without compromising truthfulness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Agent 1 */}
            <Link
              href="/student/agents"
              className="bg-white border-2 border-[#DEDEDE] hover:border-[#0A0A0A] p-6 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#E42316] transition-colors">
                  01
                </div>
                <h3 className="font-black text-base text-[#0A0A0A] uppercase tracking-tight">
                  Internship Hunter
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Scans published listings against candidate profile using 5 weighted criteria with explainable gap analysis.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DEDEDE] font-mono text-[10px] text-[#E42316] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>Deterministic Scoring</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Agent 2 */}
            <Link
              href="/student/portfolio"
              className="bg-white border-2 border-[#DEDEDE] hover:border-[#0A0A0A] p-6 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#E42316] transition-colors">
                  02
                </div>
                <h3 className="font-black text-base text-[#0A0A0A] uppercase tracking-tight">
                  Application Personalizer
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Synthesizes role-aligned cover letters referencing strictly real student GitHub projects and verified skills.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DEDEDE] font-mono text-[10px] text-[#E42316] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>100% Factual Integrity</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Agent 3 */}
            <Link
              href="/student/agents"
              className="bg-white border-2 border-[#DEDEDE] hover:border-[#0A0A0A] p-6 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#E42316] transition-colors">
                  03
                </div>
                <h3 className="font-black text-base text-[#0A0A0A] uppercase tracking-tight">
                  Application Execution
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Dispatches applications atomically in assisted or authorized auto-apply mode respecting student weekly limits.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DEDEDE] font-mono text-[10px] text-[#E42316] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>Atomic Persistence</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Agent 4 */}
            <Link
              href="/how-it-works"
              className="bg-white border-2 border-[#DEDEDE] hover:border-[#0A0A0A] p-6 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#E42316] transition-colors">
                  04
                </div>
                <h3 className="font-black text-base text-[#0A0A0A] uppercase tracking-tight">
                  Eligibility &amp; Guard
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Non-bypassable validator. Verifies GPA cutoffs, graduation cohorts, and halts duplicate submissions deterministically.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DEDEDE] font-mono text-[10px] text-[#E42316] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>Zero Duplicate Rule</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Agent 5 */}
            <Link
              href="/student/interviews"
              className="bg-white border-2 border-[#DEDEDE] hover:border-[#0A0A0A] p-6 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#E42316] transition-colors">
                  05
                </div>
                <h3 className="font-black text-base text-[#0A0A0A] uppercase tracking-tight">
                  Career Ops &amp; Prep
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Tracks stage dwell times, drafts review follow-ups, generates technical questions, and scores mock answers.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DEDEDE] font-mono text-[10px] text-[#E42316] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>Mock Rehearsal Lab</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CALL TO ACTION — OVERSIZED EDITORIAL CLOSING
          ======================================================== */}
      <section className="py-24 bg-white border-b-2 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            READY FOR HONEST RECRUITMENT?
          </span>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-none">
            MAKE YOUR <span className="text-[#E42316]">NEXT MOVE</span>.
          </h2>

          <p className="text-base sm:text-xl text-[#777777] font-light max-w-xl mx-auto leading-relaxed">
            Join the student cohort finding internships with coordinated AI, or enter the recruiter workspace to build your candidate pipeline.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/internships"
              className="px-8 py-4 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              Explore Open Internships
            </Link>

            <Link
              href="/recruiter/internships/new"
              className="px-8 py-4 border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] font-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              Recruiter: Publish Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
