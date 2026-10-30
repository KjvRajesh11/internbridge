'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Application, ApplicationStatus } from '@/types';
import { Layers } from 'lucide-react';
import Link from 'next/link';

export default function RecruiterPipelinePage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.company) {
          const list = db.getApplications({ companyId: data.company.id });
          setApplications(list);
        }
      });
  }, []);

  const stages: Array<{ id: ApplicationStatus; title: string }> = [
    { id: 'applied', title: 'Applied' },
    { id: 'under_review', title: 'Under Review' },
    { id: 'shortlisted', title: 'Shortlisted' },
    { id: 'interview_scheduled', title: 'Interview' },
    { id: 'selected', title: 'Selected' },
    { id: 'rejected', title: 'Rejected' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-[1700px] mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white mb-3">
            <Layers className="w-3 h-3 text-[#E42316]" />
            Pipeline Telemetry &amp; Funnel
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Candidate Pipeline Kanban
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-2">
            Visual tracking of candidates across every active stage of the recruitment lifecycle.
          </p>
        </div>

        {/* Kanban Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-start">
          {stages.map((stage) => {
            const stageApps = applications.filter((a) => a.status === stage.id);
            const isOffer = stage.id === 'selected';
            return (
              <div
                key={stage.id}
                className="border border-[#DEDEDE] bg-[#F5F5F3] p-4 space-y-4 min-h-[520px]"
              >
                <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#080808]">
                    {stage.title}
                  </h3>
                  <span className={`px-2 py-0.5 text-[11px] font-mono font-bold ${isOffer ? 'bg-[#E42316] text-white' : 'bg-[#0A0A0A] text-white'}`}>
                    {stageApps.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageApps.length === 0 ? (
                    <div className="text-center py-16 text-[11px] font-mono uppercase tracking-wider text-[#777777]">
                      0 Candidates
                    </div>
                  ) : (
                    stageApps.map((app) => (
                      <Link
                        key={app.id}
                        href={`/recruiter/applicants/${app.id}`}
                        className="block bg-white border border-[#DEDEDE] hover:border-[#080808] p-3.5 space-y-2 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wide group-hover:text-[#E42316] transition-colors truncate">
                            {app.student?.full_name}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-[#F5F5F3] border border-[#DEDEDE] text-[#080808] shrink-0">
                            {app.match_score ?? 90}%
                          </span>
                        </div>

                        <p className="text-xs text-[#080808] line-clamp-1 font-mono">
                          {app.internship?.title}
                        </p>
                        <p className="text-[10px] font-mono text-[#777777] uppercase tracking-wider">
                          {app.student?.education} • GPA {app.student?.gpa}
                        </p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
