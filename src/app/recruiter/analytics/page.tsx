'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Application } from '@/types';
import { BarChart3 } from 'lucide-react';

export default function RecruiterAnalyticsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.company) {
          const apps = db.getApplications({ companyId: data.company.id });
          setApplications(apps);
        }
      });
  }, []);

  const total = applications.length;
  const shortlisted = applications.filter((a) => a.status === 'shortlisted' || a.status === 'interview_scheduled' || a.status === 'selected').length;
  const interviewed = applications.filter((a) => a.status === 'interview_scheduled' || a.status === 'selected').length;
  const selected = applications.filter((a) => a.status === 'selected').length;

  const shortlistRate = total > 0 ? Math.round((shortlisted / total) * 100) : 0;
  const interviewRate = total > 0 ? Math.round((interviewed / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((selected / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white mb-3">
            <BarChart3 className="w-3 h-3 text-[#E42316]" />
            Pipeline Metrics &amp; Telemetry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Recruitment Funnel Analytics
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-2">
            Real-time pipeline metrics computed directly from authoritative database records.
          </p>
        </div>

        {/* Top Conversion Funnel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
              Total Intake
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight block">
              {total}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E42316] font-bold block pt-1">
              100% Unique Submissions
            </span>
          </div>

          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
              Shortlist Rate
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight block text-[#E42316]">
              {shortlistRate}%
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block pt-1">
              {shortlisted} Passed Review
            </span>
          </div>

          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
              Interview Conversion
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight block">
              {interviewRate}%
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block pt-1">
              {interviewed} Scheduled Rounds
            </span>
          </div>

          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
              Offer Conversion
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight block text-[#080808]">
              {offerRate}%
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block pt-1">
              {selected} Offers Approved
            </span>
          </div>
        </div>

        {/* Stage Breakdown Table */}
        <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DEDEDE]">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
              Application Stage Distribution
            </h2>
            <span className="text-xs font-mono text-[#777777]">
              {total} Total Applications
            </span>
          </div>

          <div className="space-y-5">
            {[
              { label: 'Applied (Initial Intake)', count: applications.filter((a) => a.status === 'applied').length },
              { label: 'Under Review (Technical Screening)', count: applications.filter((a) => a.status === 'under_review').length },
              { label: 'Shortlisted for Interviews', count: applications.filter((a) => a.status === 'shortlisted').length },
              { label: 'Interview Scheduled', count: applications.filter((a) => a.status === 'interview_scheduled').length },
              { label: 'Selected / Final Offer', count: applications.filter((a) => a.status === 'selected').length },
              { label: 'Rejected (Archive)', count: applications.filter((a) => a.status === 'rejected').length },
            ].map((item, i) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              const isSelected = item.label.includes('Selected');
              return (
                <div key={i} className="space-y-2 text-xs">
                  <div className="flex justify-between items-center font-mono">
                    <span className="uppercase text-[#080808] font-bold">{item.label}</span>
                    <span className="text-[#777777]">
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F5F5F3] border border-[#DEDEDE]">
                    <div
                      className={`h-full ${isSelected ? 'bg-[#E42316]' : 'bg-[#0A0A0A]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
