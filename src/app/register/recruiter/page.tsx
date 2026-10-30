'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RecruiterRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Cloud Infrastructure & Enterprise SaaS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/recruiter/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-16 px-4 border-t border-[#DEDEDE]">
      <div className="max-w-lg mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white">
            <span className="w-1.5 h-1.5 bg-[#E42316]" />
            Employer Organization Registration
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Create Recruiter Account
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            Post early-career internships and manage candidate pipelines with structured governance
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-1.5">
              Recruiter Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full bg-white border border-[#DEDEDE] p-2.5 text-xs font-mono text-[#080808] placeholder:text-[#777777] focus:border-[#E42316] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-1.5">
              Corporate Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@cloudscale.com"
              className="w-full bg-white border border-[#DEDEDE] p-2.5 text-xs font-mono text-[#080808] placeholder:text-[#777777] focus:border-[#E42316] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-1.5">
              Company Legal Name
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. CloudScale Technologies"
              className="w-full bg-white border border-[#DEDEDE] p-2.5 text-xs font-mono text-[#080808] placeholder:text-[#777777] focus:border-[#E42316] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-1.5">
              Industry Sector
            </label>
            <input
              type="text"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-white border border-[#DEDEDE] p-2.5 text-xs font-mono text-[#080808] focus:border-[#E42316] focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Create Recruiter Workspace
          </button>
        </form>

        <div className="text-center text-xs font-mono uppercase tracking-wider text-[#777777]">
          Existing Account?{' '}
          <Link href="/login" className="text-[#080808] hover:text-[#E42316] underline font-bold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
