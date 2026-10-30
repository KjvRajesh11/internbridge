'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Application, ApplicationStatus } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import {
  FileText,
  Clock,
  Building,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Filter,
} from 'lucide-react';
import Link from 'next/link';

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          fetch(`/api/applications?studentId=${data.user.id}`)
            .then((res) => res.json())
            .then((appData) => {
              if (appData.applications) setApplications(appData.applications);
            });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterStatus === 'all'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b-2 border-[#0A0A0A] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>APPLICATION TELEMETRY &amp; AUDIT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            SUBMITTED APPLICATIONS
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Deterministic stage progression, dwell time tracking, and interview records.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#DEDEDE]">
          {['all', 'applied', 'under_review', 'shortlisted', 'interview_scheduled', 'selected', 'rejected'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-[#0A0A0A] text-white font-bold'
                    : 'bg-[#F5F5F3] text-[#777777] hover:text-[#080808] border border-[#DEDEDE]'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            )
          )}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="border-2 border-dashed border-[#DEDEDE] p-16 text-center space-y-4">
              <FileText className="w-10 h-10 text-[#777777] mx-auto" />
              <h3 className="text-base font-black text-[#080808] uppercase tracking-tight">No applications match this filter</h3>
              <p className="font-mono text-xs text-[#777777] max-w-md mx-auto uppercase">
                Explore open opportunities and submit your profile using Agent 1 matching and Agent 2 personalization.
              </p>
              <Link
                href="/internships"
                className="inline-block mt-2 px-6 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              >
                Explore Open Internships
              </Link>
            </div>
          ) : (
            filtered.map((app) => (
              <div
                key={app.id}
                className="border border-[#DEDEDE] hover:border-[#0A0A0A] p-6 transition-colors bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#080808] uppercase">
                      {app.internship?.company?.name}
                    </span>
                    <span className="text-[#DEDEDE]">•</span>
                    <span className="font-mono text-xs text-[#777777]">{app.internship?.location}</span>
                  </div>

                  <Link href={`/student/applications/${app.id}`} className="block group">
                    <h3 className="text-lg font-black text-[#080808] group-hover:text-[#E42316] uppercase tracking-tight transition-colors">
                      {app.internship?.title}
                    </h3>
                  </Link>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#777777]">
                    <span>Applied on {new Date(app.submission_timestamp).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>
                      Match Score: <strong className="text-[#E42316] font-bold">{app.match_score ?? 90}%</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#DEDEDE] pt-3 md:pt-0 shrink-0">
                  <StatusBadge status={app.status} />
                  <Link
                    href={`/student/applications/${app.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    View Timeline
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
