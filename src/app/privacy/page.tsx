import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white">
            <Shield className="w-3 h-3 text-[#E42316]" />
            Data Protection &amp; Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            Privacy Policy &amp; Candidate Protection
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            Effective Date: October 2026 • InternBridge Academic Evaluation Release
          </p>
        </div>

        <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-8 space-y-8 text-xs text-[#080808] leading-relaxed">
          <section className="space-y-2 border-b border-[#DEDEDE] pb-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#080808]">
              01. Candidate Data Minimization
            </h2>
            <p>
              InternBridge collects only the profile information necessary for evaluating internship eligibility: academic institution,
              degree, graduation cohort, GPA, declared technical skills, and candidate project links.
            </p>
          </section>

          <section className="space-y-2 border-b border-[#DEDEDE] pb-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#080808]">
              02. AI Guardrails and Truthful Processing
            </h2>
            <p>
              AI agents operating on the InternBridge platform are strictly prohibited from storing prompt inputs for third-party training.
              Our agents (Hunter, Personalizer, Execution, Guard, and Career Ops) use client-authorized context and never hallucinate or
              fabricate degrees, marks, or professional certifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#080808]">
              03. Access Controls &amp; Row-Level Security
            </h2>
            <p>
              Student resume files and private application submissions are protected with PostgreSQL Row-Level Security. Recruiters can
              only view candidate materials for internships published under their verified organization.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
