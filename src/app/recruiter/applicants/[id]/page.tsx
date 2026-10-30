'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/storage/db';
import { Application, ApplicationStatus, StudentProject, StudentSkill } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Award,
} from 'lucide-react';
import Link from 'next/link';

function CandidateDetailPageInner() {
  const params = useParams();
  const id = params?.id as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [skills, setSkills] = useState<StudentSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    const app = db.getApplication(id);
    if (app) {
      setApplication(app);
      setProjects(db.getStudentProjects(app.student_id));
      setSkills(db.getStudentSkills(app.student_id));
    }
    setLoading(false);
  }, [id]);

  const handleUpdateStatus = async (newStatus: ApplicationStatus, reason: string) => {
    setUpdating(true);
    setActionMessage(null);
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, reason }),
      });
      const data = await res.json();
      if (data.success) {
        setApplication(data.application);
        setActionMessage(`Candidate stage updated to ${newStatus.replace('_', ' ')}.`);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center py-20 text-xs font-mono text-[#777777] uppercase tracking-widest">
        Loading candidate profile...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-20 text-xs font-mono text-[#777777] space-y-4">
        <p className="uppercase tracking-widest">Candidate application record not found.</p>
        <Link href="/recruiter/applicants" className="text-[#080808] hover:text-[#E42316] font-mono underline uppercase">
          Return to Applicants Queue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link
          href="/recruiter/applicants"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Applicants Queue
        </Link>

        {/* Main Header Dossier Card */}
        <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#DEDEDE]">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E42316] block font-bold">
                Applied for: {application.internship?.title}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
                {application.student?.full_name}
              </h1>
              <p className="text-xs font-mono text-[#777777] tracking-wider uppercase">
                {application.student?.email} • {application.student?.education} (Cohort {application.student?.graduation_year}) • GPA: {application.student?.gpa}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider bg-[#0A0A0A] text-white border border-[#0A0A0A]">
                {application.match_score ?? 90}% Match
              </span>
              <StatusBadge status={application.status} />
            </div>
          </div>

          {actionMessage && (
            <div className="bg-[#F5F5F3] border-l-2 border-[#E42316] text-[#080808] p-3 text-xs font-mono flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E42316] shrink-0" />
              <span>{actionMessage}</span>
            </div>
          )}

          {/* Status Transition Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#777777] mr-2">
              Pipeline Stage:
            </span>

            <button
              onClick={() => handleUpdateStatus('under_review', 'Candidate under active review by engineering leads.')}
              disabled={updating || application.status === 'under_review'}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border border-[#DEDEDE] hover:border-[#080808] hover:bg-[#080808] hover:text-white disabled:opacity-30 transition-colors"
            >
              Under Review
            </button>

            <button
              onClick={() => handleUpdateStatus('shortlisted', 'Candidate exceeded qualification threshold.')}
              disabled={updating || application.status === 'shortlisted'}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border border-[#DEDEDE] hover:border-[#080808] hover:bg-[#080808] hover:text-white disabled:opacity-30 transition-colors"
            >
              Shortlist
            </button>

            <Link
              href={`/recruiter/interviews?applicantId=${application.id}&appId=${application.id}`}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border border-[#DEDEDE] hover:border-[#080808] hover:bg-[#080808] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E42316]" />
              Schedule Interview
            </Link>

            <button
              onClick={() => handleUpdateStatus('selected', 'Final offer approved following technical rounds.')}
              disabled={updating || application.status === 'selected'}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold bg-[#E42316] text-white hover:bg-[#0A0A0A] disabled:opacity-30 transition-colors"
            >
              Select / Offer
            </button>

            <button
              onClick={() => handleUpdateStatus('rejected', 'Does not meet role requirements at this time.')}
              disabled={updating || application.status === 'rejected'}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold border border-[#DEDEDE] text-[#777777] hover:text-[#080808] hover:border-[#080808] disabled:opacity-30 transition-colors"
            >
              Reject
            </button>

            <Link
              href={`/recruiter/applicants/${application.id}/evaluate`}
              className="ml-auto px-4 py-1.5 text-xs font-mono uppercase tracking-wider font-bold bg-[#0A0A0A] hover:bg-[#E42316] text-white transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-[#E42316]" />
              Structured Scorecard
            </Link>
          </div>
        </div>

        {/* Two Column Layout: Resume/Bio + Match Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate Projects */}
            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DEDEDE]">
                <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
                  Engineering Project Portfolio
                </h2>
                <span className="text-[11px] font-mono text-[#777777]">
                  {projects.length} Verified {projects.length === 1 ? 'Project' : 'Projects'}
                </span>
              </div>
              <div className="space-y-4">
                {projects.length === 0 ? (
                  <p className="text-xs font-mono text-[#777777] uppercase py-4">No projects submitted in dossier.</p>
                ) : (
                  projects.map((p) => (
                    <div key={p.id} className="border border-[#DEDEDE] bg-[#F5F5F3] p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wide">{p.title}</h3>
                        {p.repo_url && (
                          <a
                            href={p.repo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#E42316] hover:underline flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider"
                          >
                            Repository <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-[#080808] leading-relaxed">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-white border border-[#DEDEDE] text-[10px] font-mono uppercase tracking-wider text-[#080808]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Submitted Cover Letter */}
            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-3">
              <h2 className="text-sm font-mono uppercase tracking-wider font-bold pb-3 border-b border-[#DEDEDE]">
                Submitted Candidate Statement
              </h2>
              <div className="border border-[#DEDEDE] bg-[#F5F5F3] p-4 font-mono text-xs text-[#080808] whitespace-pre-line leading-relaxed">
                {application.cover_letter || 'No custom statement provided.'}
              </div>
            </div>
          </div>

          {/* Sidebar: Match Breakdown & Resume Link */}
          <div className="space-y-6">
            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold pb-2 border-b border-[#DEDEDE]">
                Candidate Resume Document
              </h2>
              <p className="text-xs text-[#777777]">
                Original verified student resume uploaded for this submission.
              </p>
              {application.resume_url ? (
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#E42316]" /> View Resume PDF
                </a>
              ) : (
                <span className="text-xs font-mono text-[#777777] uppercase italic block">No resume file attached.</span>
              )}
            </div>

            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold pb-2 border-b border-[#DEDEDE]">
                Verified Technical Skills
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.length === 0 ? (
                  <span className="text-xs font-mono text-[#777777] uppercase">No verified skills.</span>
                ) : (
                  skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-2.5 py-1 bg-[#F5F5F3] border border-[#DEDEDE] text-[#080808] text-[11px] font-mono uppercase tracking-wider"
                    >
                      {s.skill_name}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
          <div className="w-8 h-8 border border-[#E42316] border-t-transparent animate-spin" />
        </div>
      }
    >
      <CandidateDetailPageInner />
    </Suspense>
  );
}
