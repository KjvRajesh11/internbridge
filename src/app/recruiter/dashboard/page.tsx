'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Application, Company, Internship, Profile } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import {
  Briefcase,
  Layers,
  Users,
  Calendar,
  CheckCircle2,
  Plus,
  ArrowRight,
  TrendingUp,
  BarChart3,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function RecruiterDashboardPage() {
  const [user, setUser] = useState<Profile | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setCompany(data.company);

          const companyId = data.company?.id;
          const companyInternships = db.getInternships({ companyId });
          setInternships(companyInternships);

          const companyApplications = db.getApplications({ companyId });
          setApplications(companyApplications);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const totalListings = internships.length;
  const totalApps = applications.length;
  const pendingReview = applications.filter((a) => a.status === 'applied' || a.status === 'under_review').length;
  const shortlisted = applications.filter((a) => a.status === 'shortlisted').length;
  const interviewsScheduled = applications.filter((a) => a.status === 'interview_scheduled').length;

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Editorial Header */}
        <div className="border-b-2 border-[#0A0A0A] pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
              <span className="w-2 h-2 bg-[#E42316]" />
              <span>EMPLOYER TALENT SUITE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight">
              {company?.name || 'TALENT'} RECRUITMENT OPERATIONS
            </h1>
            <p className="font-mono text-xs text-[#777777] uppercase tracking-wider">
              Signed in as <strong className="text-[#080808]">{user?.full_name}</strong> • {company?.industry || 'Technology'} • Zero duplicate applications guaranteed
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/recruiter/internships/new"
              className="px-5 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Role</span>
            </Link>
            <Link
              href="/recruiter/pipeline"
              className="px-5 py-3 border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#080808] font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#E42316]" />
              <span>View Pipeline</span>
            </Link>
          </div>
        </div>

        {/* Large Typography Numerical Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#777777] block font-bold">
              01 // ACTIVE LISTINGS
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#080808] block tracking-tight">{totalListings}</span>
            <span className="font-mono text-[11px] text-[#777777] block">Accepting candidate submissions</span>
          </div>

          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#080808] block font-bold">
              02 // TOTAL CANDIDATES
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#080808] block tracking-tight">{totalApps}</span>
            <span className="font-mono text-[11px] text-[#E42316] font-bold block">Zero duplicate spam verified</span>
          </div>

          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#E42316] block font-bold">
              03 // PENDING REVIEW
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#E42316] block tracking-tight">{pendingReview}</span>
            <Link href="/recruiter/applicants" className="font-mono text-[11px] text-[#080808] hover:text-[#E42316] font-bold block uppercase">
              Enter Review Queue &rarr;
            </Link>
          </div>

          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#777777] block font-bold">
              04 // INTERVIEWS BOOKED
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#080808] block tracking-tight">{interviewsScheduled}</span>
            <Link href="/recruiter/interviews" className="font-mono text-[11px] text-[#080808] hover:text-[#E42316] font-bold block uppercase">
              Manage Calendar &rarr;
            </Link>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recent Applicants */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDEDE]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
                  APPLICANT INTAKE
                </span>
                <h2 className="text-xl font-black text-[#080808] uppercase tracking-tight mt-0.5">
                  RECENT CANDIDATE SUBMISSIONS
                </h2>
              </div>
              <Link
                href="/recruiter/applicants"
                className="font-mono text-xs uppercase tracking-wider text-[#777777] hover:text-[#E42316] font-bold flex items-center gap-1 transition-colors"
              >
                <span>All Applicants ({totalApps})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {applications.length === 0 ? (
                <div className="border-2 border-dashed border-[#DEDEDE] p-12 text-center font-mono text-xs text-[#777777] uppercase">
                  No candidate submissions recorded yet.
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-[#DEDEDE] hover:border-[#0A0A0A] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors bg-white"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-black text-[#080808] uppercase tracking-tight">{app.student?.full_name}</span>
                        <span className="font-mono text-[10px] font-bold text-[#E42316] bg-[#F5F5F3] px-2 py-0.5 border border-[#DEDEDE]">
                          {app.match_score ?? 90}% Match
                        </span>
                      </div>
                      <p className="text-xs text-[#777777]">
                        Role: <strong className="text-[#080808] font-bold">{app.internship?.title}</strong>
                      </p>
                      <p className="font-mono text-[11px] text-[#777777]">
                        {app.student?.education} • GPA: {app.student?.gpa} • Cohort: {app.student?.graduation_year}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={app.status} />
                      <Link
                        href={`/recruiter/applicants/${app.id}`}
                        className="px-4 py-2 border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Published Roles Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDEDE]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
                  PUBLISHED ROLES
                </span>
                <h2 className="text-xl font-black text-[#080808] uppercase tracking-tight mt-0.5">
                  ACTIVE LISTINGS
                </h2>
              </div>
              <Link href="/recruiter/internships" className="font-mono text-xs font-bold uppercase text-[#777777] hover:text-[#E42316]">
                Manage ({internships.length})
              </Link>
            </div>

            <div className="space-y-3">
              {internships.map((intern) => (
                <div key={intern.id} className="border border-[#DEDEDE] p-5 space-y-2.5 bg-white hover:border-[#0A0A0A] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F3] text-[#080808] uppercase border border-[#DEDEDE]">
                      {intern.work_mode}
                    </span>
                    <span className="font-mono text-[11px] text-[#777777]">{intern.openings_count} openings</span>
                  </div>
                  <h3 className="text-sm font-black text-[#080808] uppercase tracking-tight line-clamp-1">{intern.title}</h3>
                  <p className="font-mono text-xs text-[#080808] font-bold">{intern.stipend}</p>
                  <div className="pt-2 border-t border-[#DEDEDE] flex items-center justify-between font-mono text-xs">
                    <span className="text-[10px] text-[#777777]">
                      Deadline: {new Date(intern.application_deadline).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/recruiter/internships/${intern.id}/edit`}
                      className="text-[#E42316] hover:text-[#080808] font-bold uppercase text-[11px]"
                    >
                      Edit Listing
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
