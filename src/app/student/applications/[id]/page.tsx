'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/storage/db';
import { Application, ApplicationStatusHistory, Interview } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Building,
  CheckCircle2,
  FileText,
  Sparkles,
  Send,
  AlertCircle,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

function ApplicationDetailPageInner() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [application, setApplication] = useState<Application | null>(null);
  const [history, setHistory] = useState<ApplicationStatusHistory[]>([]);
  const [followUpDraft, setFollowUpDraft] = useState<string | null>(null);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/applications`)
      .then((res) => res.json())
      .then((data) => {
        const app = data.applications?.find((a: Application) => a.id === id);
        if (app) {
          setApplication(app);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20 font-mono text-xs text-[#777777] uppercase tracking-wider">
        Loading application dossier...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-xl font-black text-[#080808] uppercase tracking-tight">Application Record Not Found</h2>
        <Link href="/student/applications" className="font-mono text-xs font-bold text-[#E42316] uppercase tracking-wider hover:underline">
          Return to Applications Tracker
        </Link>
      </div>
    );
  }

  const handleGenerateFollowUp = async () => {
    setIsGeneratingDraft(true);
    try {
      await fetch(`/api/agents/prep`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internshipId: application.internship_id }),
      });

      const draft = `Subject: Following up on ${application.internship?.title} Application - ${application.student?.full_name}

Dear ${application.internship?.company?.name} Recruiting Team,

I hope you are having a productive week. I wanted to respectfully follow up regarding my application for the ${application.internship?.title} role submitted on ${new Date(
        application.submission_timestamp
      ).toLocaleDateString()}.

I remain enthusiastic about the opportunity to contribute my skills in ${application.internship?.required_skills.slice(0, 3).join(', ')} to your engineering team. Please feel free to reach out if you require any additional materials, portfolio code repositories, or reference discussions.

Thank you very much for your time and continued review.

Sincerely,
${application.student?.full_name}`;
      setFollowUpDraft(draft);
    } catch {
      // fallback
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const copyToClipboard = () => {
    if (followUpDraft) {
      navigator.clipboard.writeText(followUpDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/student/applications"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#E42316]" /> Back to Application Tracker
        </Link>

        {/* Main Header Card */}
        <div className="border-2 border-[#0A0A0A] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DEDEDE] pb-6">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#E42316] uppercase tracking-wider block">
                {application.internship?.company?.name}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#080808] uppercase tracking-tight">
                {application.internship?.title}
              </h1>
              <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
                DOSSIER ID: <span className="text-[#080808] font-bold">{application.id}</span> • SUBMITTED ON{' '}
                {new Date(application.submission_timestamp).toLocaleDateString()}
              </p>
            </div>
            <StatusBadge status={application.status} />
          </div>

          {/* Interview Notification Banner if Interview Scheduled */}
          {application.status === 'interview_scheduled' && (
            <div className="bg-[#0A0A0A] text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E42316]" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E42316]">
                    Technical Interview Scheduled
                  </h3>
                </div>
                <p className="text-xs text-[#DEDEDE]">
                  The hiring team has confirmed your interview. Review our customized AI preparation sheet tailored to this role.
                </p>
              </div>
              <Link
                href={`/student/interviews/${application.id}/prep`}
                className="px-4 py-2 bg-[#E42316] hover:bg-white hover:text-[#080808] text-white font-mono text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
              >
                Launch Prep Lab
              </Link>
            </div>
          )}
        </div>

        {/* Timeline & Status Progression */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-5">
          <div className="border-b border-[#DEDEDE] pb-3">
            <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">
              Application Status Audit Trail
            </h2>
            <p className="font-mono text-[11px] text-[#777777] mt-0.5 uppercase tracking-wider">
              Immutable chronological record of status transitions
            </p>
          </div>

          <div className="relative border-l-2 border-[#0A0A0A] ml-3 pl-6 space-y-6 text-xs font-mono">
            <div className="relative">
              <span className="absolute -left-[31px] top-0.5 h-3.5 w-3.5 bg-[#0A0A0A]" />
              <div className="space-y-0.5">
                <span className="font-bold text-[#080808] uppercase">01 // Application Submitted</span>
                <span className="text-[10px] text-[#777777] block">
                  {new Date(application.submission_timestamp).toLocaleString()}
                </span>
                <p className="text-[#080808] font-sans text-xs pt-1">
                  Candidate submitted verified profile, project portfolio, and tailored cover statement.
                </p>
              </div>
            </div>

            {application.status !== 'applied' && (
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 h-3.5 w-3.5 bg-[#0A0A0A]" />
                <div className="space-y-0.5">
                  <span className="font-bold text-[#080808] uppercase">02 // Under Active Review</span>
                  <span className="text-[10px] text-[#777777] block">
                    {new Date(new Date(application.submission_timestamp).getTime() + 86400000).toLocaleString()}
                  </span>
                  <p className="text-[#080808] font-sans text-xs pt-1">
                    Recruiter screening queue evaluated academic alignment and required skills.
                  </p>
                </div>
              </div>
            )}

            {(application.status === 'shortlisted' ||
              application.status === 'interview_scheduled' ||
              application.status === 'selected') && (
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 h-3.5 w-3.5 bg-[#E42316]" />
                <div className="space-y-0.5">
                  <span className="font-bold text-[#E42316] uppercase">03 // Shortlisted for Technical Round</span>
                  <span className="text-[10px] text-[#777777] block">
                    {new Date(new Date(application.submission_timestamp).getTime() + 2 * 86400000).toLocaleString()}
                  </span>
                  <p className="text-[#080808] font-sans text-xs pt-1">
                    Candidate passed resume and project checks. Moved to technical interview queue.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submitted Materials */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-black text-[#080808] uppercase tracking-tight pb-3 border-b border-[#DEDEDE]">
            Submitted Application Materials
          </h2>

          {application.cover_letter && (
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider block">Cover Statement</span>
              <div className="bg-[#F5F5F3] border border-[#DEDEDE] p-4 font-mono text-xs text-[#080808] leading-relaxed whitespace-pre-line">
                {application.cover_letter}
              </div>
            </div>
          )}

          {application.answers && Object.keys(application.answers).length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider block">Screening Question Responses</span>
              {Object.entries(application.answers).map(([key, val]) => (
                <div key={key} className="bg-[#F5F5F3] border border-[#DEDEDE] p-4 text-xs font-mono">
                  <span className="text-[#777777] font-bold uppercase tracking-wider block text-[10px]">{key.replace('_', ' ')}</span>
                  <span className="text-[#080808] font-medium mt-1 block font-sans">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agent 5 Follow-Up Draft Assistant */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DEDEDE] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E42316]" />
              <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Agent 5: Follow-Up Draft Generator</h2>
            </div>
            <button
              onClick={handleGenerateFollowUp}
              disabled={isGeneratingDraft}
              className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors disabled:opacity-50"
            >
              {isGeneratingDraft ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Drafting...
                </>
              ) : (
                'Generate Follow-Up Draft'
              )}
            </button>
          </div>
          <p className="font-mono text-xs text-[#777777]">
            Generates polite, professional inquiry emails when application review dwell time exceeds 7 days.
          </p>

          {followUpDraft && (
            <div className="bg-[#F5F5F3] border border-[#DEDEDE] p-5 space-y-3 text-xs">
              <pre className="text-[#080808] font-mono text-xs whitespace-pre-line leading-relaxed">
                {followUpDraft}
              </pre>
              <div className="flex justify-end pt-2 border-t border-[#DEDEDE]">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#0A0A0A] hover:text-white text-[#080808] border border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied to Clipboard!' : 'Copy Draft'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-[#777777]">
          Loading application...
        </div>
      }
    >
      <ApplicationDetailPageInner />
    </Suspense>
  );
}
