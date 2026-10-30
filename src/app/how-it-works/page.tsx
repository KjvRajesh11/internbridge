import React from 'react';
import Link from 'next/link';
import {
  Compass,
  FileCheck,
  Send,
  Calendar,
  Sparkles,
  Shield,
} from 'lucide-react';

export default function HowItWorksPage() {
  const studentSteps = [
    {
      step: '01',
      title: 'Complete Profile & Add Real Projects',
      desc: 'Declare your skills, GitHub repositories, academic branch, GPA, and graduation cohort. InternBridge uses this verified profile data as the single source of truth.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Autonomous Hunter Scans Matches',
      desc: 'Agent 1 computes multi-factor compatibility scores across published roles, highlighting matching vs missing skills so you know exactly where you stand.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Tailor Materials with Factual AI',
      desc: 'Agent 2 drafts a role-specific cover letter referencing only your real projects. Review, edit, and approve every generated artifact before submission.',
      icon: FileCheck,
    },
    {
      step: '04',
      title: 'Pass Integrity Guard & Submit Safely',
      desc: 'Agent 4 runs non-negotiable checks (active deadline, GPA threshold, and 1-application-per-internship rule). Upon approval, your application is atomically persisted.',
      icon: Send,
    },
    {
      step: '05',
      title: 'Track Pipeline & Rehearse with AI',
      desc: 'Agent 5 monitors stage dwell times, generates polite follow-up drafts if reviews lag, and constructs tailored technical and behavioral mock interview questions.',
      icon: Calendar,
    },
  ];

  const recruiterSteps = [
    {
      step: '01',
      title: 'Define Role & Set Hard Cutoffs',
      desc: 'Publish internship opportunities with required and preferred skills, minimum GPA cutoffs, and accepted graduation cohorts.',
    },
    {
      step: '02',
      title: 'Review Verified Applicants',
      desc: 'View ranked applicants with transparent match breakdowns, candidate projects, and original resume files without duplicate clutter.',
    },
    {
      step: '03',
      title: 'Shortlist with Structured Criteria',
      desc: 'Evaluate candidates on job-related criteria (technical, communication, problem solving) and record status transitions with audit reasons.',
    },
    {
      step: '04',
      title: 'Conflict-Free Interview Scheduling',
      desc: 'Define available slots and schedule candidates with meeting links. Built-in atomic locks prevent double-booking.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE] space-y-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white">
          <span className="w-1.5 h-1.5 bg-[#E42316]" />
          End-to-End Operational Workflow
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
          How InternBridge Coordinates the Hiring Journey.
        </h1>
        <p className="text-sm font-mono uppercase tracking-wider text-[#777777] max-w-3xl leading-relaxed">
          From opportunity discovery to final interview feedback, see how students and recruiters collaborate
          transparently across every phase of the lifecycle.
        </p>
      </div>

      {/* Student Journey */}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-[#DEDEDE] pb-4 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E42316] block mb-1">
              Student Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              From Profile to Verified Offer
            </h2>
          </div>
          <span className="text-xs font-mono text-[#777777] hidden sm:block">
            5 STEPS TO APPOINTMENT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {studentSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="border border-[#DEDEDE] bg-[#FFFFFF] p-5 space-y-3 flex flex-col justify-between hover:border-[#080808] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-[#DEDEDE] pb-3">
                    <span className="text-2xl font-black text-[#080808] font-mono">{s.step}</span>
                    <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#E42316]" />
                    </div>
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wide mb-2">{s.title}</h3>
                  <p className="text-xs text-[#080808] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recruiter Journey */}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-[#DEDEDE] pb-4 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E42316] block mb-1">
              Recruiter Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Structured, Bias-Free Talent Selection
            </h2>
          </div>
          <span className="text-xs font-mono text-[#777777] hidden sm:block">
            4 OPERATIONAL PHASES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recruiterSteps.map((r) => (
            <div
              key={r.step}
              className="border border-[#DEDEDE] bg-[#F5F5F3] p-6 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-2">
                <span className="text-2xl font-black text-[#080808] font-mono">{r.step}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">Stage</span>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wide">{r.title}</h3>
              <p className="text-xs text-[#080808] leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Duplicate Rule Banner */}
      <div className="max-w-6xl mx-auto border border-[#080808] bg-[#0A0A0A] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#151515] border border-[#303030] text-[#E42316] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E42316] font-bold block">
              Core Platform Guarantee
            </span>
            <h4 className="text-lg font-bold uppercase tracking-wide">
              Non-Negotiable Duplicate Prevention Guard
            </h4>
            <p className="text-xs font-mono text-[#A0A0A0] max-w-2xl leading-relaxed">
              InternBridge strictly forbids duplicate applications for the same internship. Enforced through a database
              UNIQUE constraint on (student_id, internship_id), server-side pre-flight guards, and atomic booking transactions.
            </p>
          </div>
        </div>
        <Link
          href="/internships"
          className="px-6 py-3 bg-[#E42316] hover:bg-white hover:text-[#080808] text-white font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shrink-0"
        >
          Explore Internships
        </Link>
      </div>
    </div>
  );
}
