'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Application, Company } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Calendar,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function RecruiterApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.company) {
          setCompany(data.company);
          const list = db.getApplications({ companyId: data.company.id });
          setApplications(list);
        }
      });
  }, []);

  const filtered = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      app.student?.full_name.toLowerCase().includes(q) ||
      app.internship?.title.toLowerCase().includes(q) ||
      app.student?.education?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b-2 border-[#0A0A0A] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>APPLICANT INTAKE &amp; EVALUATION DOSSIERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            CANDIDATE DIRECTORY
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Review candidate resumes, evaluate project portfolios, and transition applicants through the recruitment funnel.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="border border-[#DEDEDE] bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by candidate name, college, or role..."
              className="pl-10 text-xs font-mono"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto font-mono text-xs">
            <span className="font-bold text-[#080808] uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-mono"
            >
              <option value="all">All Stages ({applications.length})</option>
              <option value="applied">Applied</option>
              <option value="under_review">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="border border-[#DEDEDE] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#0A0A0A] bg-[#F5F5F3] text-[#080808] font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3.5 px-6">Candidate</th>
                  <th className="py-3.5 px-4">Applied Role</th>
                  <th className="py-3.5 px-4">Compatibility</th>
                  <th className="py-3.5 px-4">Academic Baseline</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDEDE] text-[#080808]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-[#777777] uppercase">
                      No applicants found matching this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((app) => (
                    <tr key={app.id} className="hover:bg-[#F5F5F3] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#080808] text-sm uppercase">{app.student?.full_name}</div>
                        <div className="text-[11px] text-[#777777]">{app.student?.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-[#080808] block text-xs uppercase">{app.internship?.title}</span>
                        <span className="text-[10px] text-[#777777]">
                          {new Date(app.submission_timestamp).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-[#F5F5F3] text-[#E42316] border border-[#DEDEDE] font-bold text-xs">
                          {app.match_score ?? 90}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="block text-[#080808] font-medium">{app.student?.education}</span>
                        <span className="text-[10px] text-[#777777]">
                          GPA: {app.student?.gpa ?? 'N/A'} • Class of {app.student?.graduation_year}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/recruiter/applicants/${app.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] hover:text-white text-[#080808] font-mono font-bold uppercase tracking-wider transition-colors text-xs"
                        >
                          Review Dossier <ArrowRight className="w-3.5 h-3.5 text-[#E42316]" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
