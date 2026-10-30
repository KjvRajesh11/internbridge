import React from 'react';
import Link from 'next/link';
import {
  Compass,
  FileCheck,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE] space-y-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white">
          <span className="w-1.5 h-1.5 bg-[#E42316]" />
          Platform Architecture &amp; System Telemetry
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
          Engineered for Rigorous, Honest Career Operations.
        </h1>
        <p className="text-sm font-mono uppercase tracking-wider text-[#777777] max-w-3xl leading-relaxed">
          InternBridge separates deterministic data validation from probabilistic generative AI.
          The result is an intelligent recruitment engine where AI assists students without compromising company trust.
        </p>
      </div>

      {/* 5 Coordinated Agents Deep Dive */}
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="border-b border-[#DEDEDE] pb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              The Five Coordinated AI Agents
            </h2>
            <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-1">
              Independently testable, audited domain services orchestrated through a central pipeline bus.
            </p>
          </div>
          <span className="text-xs font-mono text-[#E42316] font-bold hidden sm:block">
            01 — 05 AGENTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Agent 1 */}
          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
            <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#E42316]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#E42316] uppercase tracking-widest block">
              Agent 01
            </span>
            <h3 className="text-base font-bold uppercase tracking-wide">
              Autonomous Internship Hunter
            </h3>
            <p className="text-xs text-[#080808] leading-relaxed">
              Scans active, published opportunities against each candidate&apos;s verified skills, academic department, and graduation year.
            </p>
            <div className="bg-[#F5F5F3] p-3 border border-[#DEDEDE] text-[11px] font-mono space-y-1.5">
              <span className="font-bold text-[#080808] block uppercase">Deterministic Scoring:</span>
              <div className="flex justify-between text-[#777777]">
                <span>Required Skills</span> <span className="text-[#080808]">40%</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Preferred Skills</span> <span className="text-[#080808]">20%</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Target Roles</span> <span className="text-[#080808]">15%</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Academic &amp; GPA</span> <span className="text-[#080808]">10%</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Location &amp; Mode</span> <span className="text-[#080808]">10%</span>
              </div>
            </div>
          </div>

          {/* Agent 2 */}
          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
            <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-[#E42316]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#E42316] uppercase tracking-widest block">
              Agent 02
            </span>
            <h3 className="text-base font-bold uppercase tracking-wide">
              Personalization &amp; Resume Assistant
            </h3>
            <p className="text-xs text-[#080808] leading-relaxed">
              Synthesizes tailored cover letters, screening answers, and portfolio bullet points. Operates with strict factual integrity.
            </p>
            <ul className="text-xs font-mono text-[#080808] space-y-2 border-t border-[#DEDEDE] pt-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Only references real student projects &amp; skills</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Zero fabrication of degrees, marks, or metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Artifacts saved for student review &amp; approval</span>
              </li>
            </ul>
          </div>

          {/* Agent 3 */}
          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
            <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#E42316]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#E42316] uppercase tracking-widest block">
              Agent 03
            </span>
            <h3 className="text-base font-bold uppercase tracking-wide">
              Autonomous Application Execution
            </h3>
            <p className="text-xs text-[#080808] leading-relaxed">
              Executes internal applications with dual operating modes: Assisted (candidate reviews and clicks submit) or Authorized Auto-Apply.
            </p>
            <ul className="text-xs font-mono text-[#080808] space-y-2 border-t border-[#DEDEDE] pt-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Requires explicit student opt-in settings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Evaluates all hard eligibility constraints first</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Records complete audit trail into agent_runs</span>
              </li>
            </ul>
          </div>

          {/* Agent 4 */}
          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
            <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#E42316]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#E42316] uppercase tracking-widest block">
              Agent 04
            </span>
            <h3 className="text-base font-bold uppercase tracking-wide">
              Eligibility &amp; Integrity Guard
            </h3>
            <p className="text-xs text-[#080808] leading-relaxed">
              Deterministic validation service that acts as the ultimate gatekeeper. Cannot be bypassed by the AI orchestration layer.
            </p>
            <ul className="text-xs font-mono text-[#080808] space-y-2 border-t border-[#DEDEDE] pt-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Enforces exactly 1 application per internship</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Checks active publication &amp; deadline validity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E42316] shrink-0 mt-0.5" />
                <span>Evaluates minimum GPA &amp; graduation year cutoffs</span>
              </li>
            </ul>
          </div>

          {/* Agent 5 */}
          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4 lg:col-span-2">
            <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#E42316]" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#E42316] uppercase tracking-widest block">
              Agent 05
            </span>
            <h3 className="text-base font-bold uppercase tracking-wide">
              Career Operations &amp; Interview Prep
            </h3>
            <p className="text-xs text-[#080808] leading-relaxed">
              Provides post-application tracking intelligence: calculates stage dwell times, flags applications exceeding review
              targets, drafts polite follow-up messages, generates technical &amp; behavioral interview questions, and scores mock answers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="bg-[#F5F5F3] p-3.5 border border-[#DEDEDE]">
                <span className="font-bold text-[#080808] uppercase block mb-1">Dwell-Time Tracking</span>
                <span className="text-[#777777]">Flags applications exceeding 7 days in review with tailored follow-up drafts.</span>
              </div>
              <div className="bg-[#F5F5F3] p-3.5 border border-[#DEDEDE]">
                <span className="font-bold text-[#080808] uppercase block mb-1">Tailored Mock Rehearsal</span>
                <span className="text-[#777777]">STAR framework practice with automated rubric scoring on concrete reasoning.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter & Company Architecture */}
      <div className="max-w-6xl mx-auto border border-[#DEDEDE] bg-[#0A0A0A] text-white p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E42316] font-bold block mb-2">
            Governance &amp; Isolation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
            Complete Recruiter Governance &amp; Controls
          </h2>
          <p className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0] mt-1">
            Built from the ground up to respect company boundaries and prevent recruitment bias.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
          <div className="space-y-2 p-5 border border-[#303030] bg-[#151515]">
            <div className="text-white font-bold uppercase tracking-wider text-sm">PostgreSQL Row-Level Security</div>
            <p className="text-[#A0A0A0] leading-relaxed">
              Recruiters can only access candidate applications associated with their authorized company listings.
            </p>
          </div>
          <div className="space-y-2 p-5 border border-[#303030] bg-[#151515]">
            <div className="text-white font-bold uppercase tracking-wider text-sm">Atomic Slot Booking</div>
            <p className="text-[#A0A0A0] leading-relaxed">
              Recruiter availability slots are explicitly modeled with atomic booking locks to eliminate double-booking.
            </p>
          </div>
          <div className="space-y-2 p-5 border border-[#303030] bg-[#151515]">
            <div className="text-white font-bold uppercase tracking-wider text-sm">Structured Rubric Scorecards</div>
            <p className="text-[#A0A0A0] leading-relaxed">
              Standardized criteria for technical proficiency, communication, and problem-solving without opaque AI rejections.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto text-center space-y-4 pb-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
          Experience the Platform in Action
        </h3>
        <p className="text-xs font-mono uppercase tracking-wider text-[#777777] max-w-md mx-auto">
          Use our one-click persona switcher at the top of any page to test student applications, recruiter pipelines, and AI agent runs.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/internships"
            className="px-6 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
          >
            Explore Internships
          </Link>
          <Link
            href="/recruiter/dashboard"
            className="px-6 py-3 border border-[#080808] hover:bg-[#080808] hover:text-white text-[#080808] font-mono text-xs uppercase tracking-wider font-bold transition-colors"
          >
            Recruiter Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
