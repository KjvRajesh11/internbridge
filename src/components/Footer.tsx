import React from 'react';
import Link from 'next/link';
import { Shield, Bot, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-[#0A0A0A] text-[#0A0A0A] mt-auto">
      {/* Official Problem Statement Banner */}
      <div className="bg-[#F4F4F2] border-b border-[#DEDEDE] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-[#0A0A0A] text-white mt-0.5 shrink-0">
              <Shield className="w-4 h-4 text-[#E42316]" />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold text-[#E42316] uppercase tracking-widest block">
                Official Problem Statement &amp; Enforced Non-Negotiable
              </span>
              <p className="text-xs text-[#0A0A0A] mt-1 max-w-4xl leading-relaxed font-serif italic">
                &ldquo;Internship Application Portal: Create an internship portal where companies post internship
                opportunities and students apply online. Recruiters should manage applications, shortlist candidates,
                and schedule interviews. Students should track application progress from a dashboard. Key Rule: A student
                cannot apply to the same internship more than once.&rdquo;
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#0A0A0A] whitespace-nowrap bg-white border border-[#0A0A0A] px-3.5 py-2 font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#E42316]" />
            <span>ENFORCED IN DB &amp; API</span>
          </div>
        </div>
      </div>

      {/* Main 4-Column Editorial Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-[#E42316]" />
            <span className="font-black text-xl tracking-tight text-[#0A0A0A] uppercase">
              INTERN<span className="text-[#E42316]">BRIDGE</span>
            </span>
          </div>
          <p className="text-xs text-[#777777] leading-relaxed max-w-xs">
            Autonomous career infrastructure connecting ambitious students with pioneering technology teams through coordinated AI agents.
          </p>
          <div className="pt-2 font-mono text-[11px] uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 bg-[#E42316]" />
            <span>5 Specialized Agents</span>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-4 border-b border-[#DEDEDE] pb-2">
            Student Suite
          </h4>
          <ul className="space-y-2.5 font-mono text-xs">
            <li>
              <Link href="/internships" className="text-[#777777] hover:text-[#E42316] transition-colors flex items-center justify-between">
                <span>Explore Internships</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </Link>
            </li>
            <li>
              <Link href="/student/dashboard" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Student Dashboard
              </Link>
            </li>
            <li>
              <Link href="/student/applications" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Application Tracker
              </Link>
            </li>
            <li>
              <Link href="/student/agents" className="text-[#777777] hover:text-[#E42316] transition-colors">
                AI Agent Command Center
              </Link>
            </li>
            <li>
              <Link href="/student/interviews" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Interview Rehearsal &amp; Prep
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-4 border-b border-[#DEDEDE] pb-2">
            Recruiter Suite
          </h4>
          <ul className="space-y-2.5 font-mono text-xs">
            <li>
              <Link href="/recruiter/dashboard" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Recruiter Dashboard
              </Link>
            </li>
            <li>
              <Link href="/recruiter/internships/new" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Publish Internship Role
              </Link>
            </li>
            <li>
              <Link href="/recruiter/internships" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Manage Active Listings
              </Link>
            </li>
            <li>
              <Link href="/recruiter/applicants" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Candidate Pipeline
              </Link>
            </li>
            <li>
              <Link href="/recruiter/pipeline" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Kanban Stage Board
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-4 border-b border-[#DEDEDE] pb-2">
            Integrity &amp; Guardrails
          </h4>
          <ul className="space-y-2.5 font-mono text-xs">
            <li>
              <Link href="/features" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Multi-Agent Architecture
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Deterministic Validation
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Data Privacy &amp; RLS
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#777777] hover:text-[#E42316] transition-colors">
                Platform Rules of Engagement
              </Link>
            </li>
          </ul>
          <p className="font-mono text-[10px] text-[#777777] mt-4 leading-relaxed border-t border-[#DEDEDE] pt-3">
            AI operates strictly within deterministic validation boundaries and never fabricates candidate credentials.
          </p>
        </div>
      </div>

      <div className="border-t border-[#DEDEDE] py-5 px-4 text-center font-mono text-[11px] text-[#777777] uppercase tracking-wider">
        <p>&copy; 2026 INTERNBRIDGE. AUTONOMOUS RECRUITMENT NETWORK. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
