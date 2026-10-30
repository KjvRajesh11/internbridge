'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Bot,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { StatusBadge } from '@/components/StatusBadge';
import { Application, Interview, Internship, Profile } from '@/types';

export default function StudentDashboardPage() {
  const [user, setUser] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          fetch(`/api/applications?studentId=${data.user.id}`)
            .then((res) => res.json())
            .then((appData) => {
              if (appData.applications) setApplications(appData.applications);
            });

          fetch('/api/agents/hunter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId: data.user.id }),
          })
            .then((res) => res.json())
            .then((huntData) => {
              if (huntData.recommendations) setRecommendations(huntData.recommendations.slice(0, 3));
            });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const totalApps = applications.length;
  const underReview = applications.filter((a) => a.status === 'under_review' || a.status === 'applied').length;
  const shortlisted = applications.filter((a) => a.status === 'shortlisted').length;
  const scheduledInterviews = applications.filter((a) => a.status === 'interview_scheduled').length;

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Editorial Header */}
        <div className="border-b-2 border-[#0A0A0A] pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
              <span className="w-2 h-2 bg-[#E42316]" />
              <span>CANDIDATE INTELLIGENCE TERMINAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight">
              WELCOME BACK, <span className="text-[#E42316]">{user?.full_name || 'CANDIDATE'}</span>.
            </h1>
            <p className="font-mono text-xs text-[#777777] uppercase tracking-wider">
              {user?.education} • {user?.degree} in {user?.department} • COHORT {user?.graduation_year} • GPA {user?.gpa}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/student/agents"
              className="px-5 py-3 border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#080808] font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2"
            >
              <Bot className="w-3.5 h-3.5 text-[#E42316]" />
              <span>AI Agents Hub</span>
            </Link>
            <Link
              href="/internships"
              className="px-5 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Large Typography Numerical Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#777777] block font-bold">
              01 // SUBMITTED
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#080808] block tracking-tight">{totalApps}</span>
            <span className="font-mono text-[11px] text-[#777777] block">Atomic applications registered</span>
          </div>

          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#777777] block font-bold">
              02 // IN REVIEW
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#080808] block tracking-tight">{underReview}</span>
            <span className="font-mono text-[11px] text-[#777777] block">Under active recruiter screening</span>
          </div>

          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#E42316] block font-bold">
              03 // SHORTLISTED
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#E42316] block tracking-tight">{shortlisted}</span>
            <span className="font-mono text-[11px] text-[#777777] block">Qualified for next evaluation round</span>
          </div>

          <div className="border border-[#DEDEDE] bg-white p-6 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#080808] block font-bold">
              04 // INTERVIEWS
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#080808] block tracking-tight">{scheduledInterviews}</span>
            <span className="font-mono text-[11px] text-[#777777] block">Scheduled live technical sessions</span>
          </div>
        </div>

        {/* Main Operational Workspace: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Applications Tracker */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
                  ACTIVE CANDIDATE PIPELINE
                </span>
                <h2 className="text-xl font-black text-[#080808] uppercase tracking-tight mt-0.5">
                  MY SUBMITTED APPLICATIONS
                </h2>
              </div>
              <Link
                href="/student/applications"
                className="font-mono text-xs uppercase tracking-wider text-[#777777] hover:text-[#E42316] font-bold flex items-center gap-1 transition-colors"
              >
                <span>View Full Audit ({applications.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {applications.length === 0 ? (
              <div className="border-2 border-dashed border-[#DEDEDE] p-12 text-center space-y-3">
                <FileText className="w-8 h-8 text-[#777777] mx-auto" />
                <p className="font-mono text-xs uppercase tracking-wider text-[#777777]">
                  No applications submitted yet. Browse opportunities to trigger Agent 1 &amp; 2.
                </p>
                <Link
                  href="/internships"
                  className="inline-block px-5 py-2.5 bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold"
                >
                  Browse Internships
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-[#DEDEDE] hover:border-[#0A0A0A] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors bg-white"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#080808] uppercase">
                          {app.internship?.company?.name || 'Partner Company'}
                        </span>
                        <span className="text-[#DEDEDE]">•</span>
                        <StatusBadge status={app.status} size="sm" />
                      </div>
                      <Link
                        href={`/student/applications/${app.id}`}
                        className="text-base font-black text-[#080808] hover:text-[#E42316] uppercase tracking-tight transition-colors block"
                      >
                        {app.internship?.title || 'Engineering Internship'}
                      </Link>
                      <div className="font-mono text-[11px] text-[#777777] flex items-center gap-3">
                        <span>Submitted: {new Date(app.submission_timestamp).toLocaleDateString()}</span>
                        {app.match_score !== undefined && (
                          <span className="text-[#E42316] font-bold">Match: {app.match_score}%</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/student/applications/${app.id}`}
                        className="px-4 py-2 border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                      >
                        View Dossier
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Agent Recommendations & Career Ops */}
          <div className="space-y-6">
            <div className="border-b border-[#DEDEDE] pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
                AGENT 1 RECOMMENDATIONS
              </span>
              <h2 className="text-xl font-black text-[#080808] uppercase tracking-tight mt-0.5">
                MATCHED FOR YOU
              </h2>
            </div>

            <div className="space-y-4">
              {recommendations.length === 0 ? (
                <div className="border border-[#DEDEDE] bg-[#F5F5F3] p-6 text-center space-y-2">
                  <Compass className="w-6 h-6 text-[#777777] mx-auto" />
                  <p className="font-mono text-xs text-[#777777]">Run Hunter to calculate compatibility rankings.</p>
                  <Link
                    href="/student/agents"
                    className="inline-block px-3.5 py-1.5 bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-wider font-bold"
                  >
                    Run Hunter
                  </Link>
                </div>
              ) : (
                recommendations.map((rec, i) => (
                  <div
                    key={rec.internship?.id || i}
                    className="border border-[#DEDEDE] p-5 space-y-3 bg-white hover:border-[#0A0A0A] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#080808] font-bold">
                        {rec.internship?.company?.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#E42316] bg-[#F5F5F3] px-2 py-0.5 border border-[#DEDEDE]">
                        {rec.matchScore}% MATCH
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#080808] uppercase tracking-tight">
                      {rec.internship?.title}
                    </h3>

                    <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed">
                      {rec.internship?.description}
                    </p>

                    <div className="pt-2 border-t border-[#DEDEDE] flex items-center justify-between font-mono text-xs">
                      <span className="text-[#080808] font-bold">{rec.internship?.stipend}</span>
                      <Link
                        href={`/internships/${rec.internship?.id}`}
                        className="text-[#E42316] hover:text-[#080808] font-bold flex items-center gap-1 uppercase tracking-wider text-[11px]"
                      >
                        Apply <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              )}

              {/* Career Ops Rehearsal Banner */}
              <div className="border-2 border-[#0A0A0A] bg-[#0A0A0A] text-white p-6 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E42316] font-bold block">
                  AGENT 5 INTERVIEW LAB
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Tailored Mock Answer Evaluation
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Practice STAR behavioral and technical responses tailored to role requirements. Receive structured rubric feedback.
                </p>
                <div className="pt-2">
                  <Link
                    href="/student/interviews"
                    className="inline-block px-4 py-2 bg-[#E42316] hover:bg-white hover:text-[#080808] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    Enter Prep Lab
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
