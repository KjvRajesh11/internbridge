'use client';

import React, { useState, useEffect } from 'react';
import { Internship } from '@/types';
import {
  Sparkles,
  X,
  AlertCircle,
  CheckCircle2,
  Send,
  Loader2,
  FileText,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface ApplyModalProps {
  internship: Internship;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (appId: string) => void;
}

export function ApplyModal({ internship, isOpen, onClose, onSuccess }: ApplyModalProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [whyCompany, setWhyCompany] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [aiRationale, setAiRationale] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          fetch(`/api/internships/${internship.id}`)
            .then((res) => res.json())
            .then((intData) => {
              if (intData.hasApplied) {
                setHasApplied(true);
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, [isOpen, internship.id]);

  if (!isOpen) return null;

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    setError(null);
    try {
      const res = await fetch('/api/agents/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internshipId: internship.id }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setCoverLetter(data.result.coverLetter);
        if (data.result.screeningAnswers?.why_company) {
          setWhyCompany(data.result.screeningAnswers.why_company);
        }
        setAiRationale(data.result.relevanceRationale);
      } else {
        setError(data.error || 'Failed to generate tailored materials.');
      }
    } catch {
      setError('Connection to AI Personalization Agent failed.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internshipId: internship.id,
          coverLetter,
          answers: {
            why_company: whyCompany || 'Excited for the engineering challenges at ' + (internship.company?.name || 'this company'),
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedAppId(data.application.id);
        if (onSuccess) onSuccess(data.application.id);
      } else {
        setError(data.error || 'Failed to submit application.');
        if (data.code === 'DUPLICATE_APPLICATION') {
          setHasApplied(true);
        }
      }
    } catch {
      setError('Network or server error submitting application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#0A0A0A] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DEDEDE] bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E42316]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
                Application Gateway
              </span>
            </div>
            <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight mt-1">{internship.title}</h2>
            <p className="font-mono text-xs text-[#777777] mt-0.5">
              {internship.company?.name} • {internship.location} • {internship.work_mode}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#DEDEDE] text-[#0A0A0A] hover:bg-[#F4F4F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#0A0A0A]">
          {/* Integrity Guard Banner */}
          <div className="bg-[#F4F4F2] border-l-4 border-[#E42316] p-4 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#0A0A0A] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#E42316]" />
              <span>Agent 4 Integrity Guard Active</span>
            </div>
            <p className="text-[#0A0A0A] text-xs">
              Rule: <strong>One application per internship strictly enforced.</strong> Attempting duplicate submissions
              is deterministically blocked at database and API layers.
            </p>
          </div>

          {/* Already Applied Warning */}
          {hasApplied && (
            <div className="bg-[#151515] border border-[#0A0A0A] text-white p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#E42316] font-mono text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-[#E42316]" />
                <span>Existing Application on File</span>
              </div>
              <p className="text-xs text-[#DEDEDE]">
                You have already submitted an application for this position. Under InternBridge platform rules, students cannot re-apply to the same internship.
              </p>
              <div className="pt-2">
                <Link
                  href="/student/applications"
                  className="inline-block px-4 py-2 bg-[#E42316] text-white font-mono text-xs uppercase tracking-wider font-bold"
                >
                  View in Application Tracker
                </Link>
              </div>
            </div>
          )}

          {/* Success Screen */}
          {submittedAppId && (
            <div className="bg-white border-2 border-[#0A0A0A] p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-[#0A0A0A] text-[#E42316] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#E42316]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#0A0A0A] uppercase tracking-tight">Application Successfully Submitted</h3>
                <p className="text-xs text-[#777777]">
                  Your application has been atomically registered and routed to the recruiter pipeline.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href={`/student/applications/${submittedAppId}`}
                  className="px-4 py-2 bg-[#E42316] text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  View Application Dossier
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* Application Form */}
          {!hasApplied && !submittedAppId && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-white border-l-4 border-[#E42316] p-3 text-xs text-[#E42316] font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* AI Agent 2 Generator Card */}
              <div className="border border-[#DEDEDE] bg-[#F4F4F2] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#E42316]" />
                    <span>Agent 2: Factual Application Personalizer</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={isGeneratingAI}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#E42316] transition-colors disabled:opacity-50"
                  >
                    {isGeneratingAI ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-[#E42316]" /> Generating...
                      </>
                    ) : (
                      <>Generate Tailored Pitch</>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[#777777]">
                  Analyzes your verified GitHub projects and skills against role requirements to construct a truthful pitch without hallucinations.
                </p>
                {aiRationale && (
                  <div className="bg-white border border-[#DEDEDE] p-3 font-mono text-[11px] text-[#0A0A0A]">
                    <span className="font-bold text-[#E42316] block uppercase tracking-wider mb-1">Agent Reasoning:</span>
                    {aiRationale}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider font-bold text-[#0A0A0A] mb-1.5">
                  Tailored Statement / Cover Letter
                </label>
                <textarea
                  rows={5}
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain your relevant engineering projects and concrete interest in this position..."
                  className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#0A0A0A] focus:border-[#E42316] focus:ring-1 focus:ring-[#E42316] outline-none font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider font-bold text-[#0A0A0A] mb-1.5">
                  Screening Question: Why {internship.company?.name || 'this company'}?
                </label>
                <textarea
                  rows={2}
                  required
                  value={whyCompany}
                  onChange={(e) => setWhyCompany(e.target.value)}
                  placeholder="What specifically appeals to you about the team, tech stack, or engineering mission?"
                  className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#0A0A0A] focus:border-[#E42316] focus:ring-1 focus:ring-[#E42316] outline-none font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#DEDEDE]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#DEDEDE] font-mono text-xs uppercase tracking-wider font-bold text-[#777777] hover:text-[#0A0A0A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying &amp; Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
