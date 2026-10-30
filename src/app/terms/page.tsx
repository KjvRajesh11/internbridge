import React from 'react';
import { Shield } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white">
            <Shield className="w-3 h-3 text-[#E42316]" />
            Platform Integrity &amp; Rules
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            Terms of Service &amp; Rules of Engagement
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            Effective Date: October 2026 • InternBridge Academic Evaluation Release
          </p>
        </div>

        <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-8 space-y-8 text-xs text-[#080808] leading-relaxed">
          <section className="space-y-3 border-b border-[#DEDEDE] pb-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#080808]">
              01. Core Integrity Mandate
            </h2>
            <div className="border-l-2 border-[#E42316] bg-[#F5F5F3] p-4 font-mono text-xs text-[#080808]">
              &ldquo;Key Rule: A student cannot apply to the same internship more than once.&rdquo;
            </div>
            <p>
              Any attempt to submit multiple applications for the same internship using concurrent requests or script automation will be
              deterministically blocked by the database unique constraint on (student_id, internship_id).
            </p>
          </section>

          <section className="space-y-2 border-b border-[#DEDEDE] pb-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#080808]">
              02. Autonomous Application Limits
            </h2>
            <p>
              Authorized auto-apply features must be explicitly enabled by the student in their preferences. Automated applications are
              restricted strictly to internal InternBridge postings and respect student weekly limits.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#080808]">
              03. Recruiter Commitments
            </h2>
            <p>
              Hiring organizations agree to evaluate candidates fairly using job-related criteria and to provide accurate internship details
              including clear work mode, location, and stipend compensation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
