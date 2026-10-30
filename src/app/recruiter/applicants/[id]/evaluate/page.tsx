'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/storage/db';
import { Application } from '@/types';
import { ArrowLeft, Award, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

function CandidateEvaluationPageInner() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [application, setApplication] = useState<Application | null>(null);
  const [technicalRating, setTechnicalRating] = useState('4');
  const [commRating, setCommRating] = useState('4');
  const [problemRating, setProblemRating] = useState('5');
  const [overallRating] = useState('4');
  const [recommendation, setRecommendation] = useState<'strong_hire' | 'hire' | 'neutral' | 'no_hire'>('hire');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const app = db.getApplication(id);
    if (app) setApplication(app);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/interviews/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interview_id: 'int-eval-' + id,
          application_id: id,
          technical_rating: Number(technicalRating),
          communication_rating: Number(commRating),
          problem_solving_rating: Number(problemRating),
          overall_rating: Number(overallRating),
          notes,
          recommendation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => router.push(`/recruiter/applicants/${id}`), 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href={`/recruiter/applicants/${id}`}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Candidate Dossier
        </Link>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white mb-3">
            <Award className="w-3 h-3 text-[#E42316]" />
            Rubric Evaluation Scorecard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Evaluate: {application?.student?.full_name}
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-2">
            Target Role: <strong className="text-[#080808]">{application?.internship?.title}</strong> • Record job-related rubric ratings and final hiring recommendation.
          </p>
        </div>

        {saved && (
          <div className="bg-[#F5F5F3] border-l-2 border-[#E42316] text-[#080808] p-4 text-xs font-mono flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#E42316] shrink-0" />
            <span>Scorecard committed. Navigating to candidate dossier...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="techRating" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Technical Knowledge &amp; Code (1 - 5)
              </label>
              <select
                id="techRating"
                value={technicalRating}
                onChange={(e) => setTechnicalRating(e.target.value)}
                className="w-full text-xs font-mono uppercase tracking-wider border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              >
                <option value="5">5 — Exceptional Mastery</option>
                <option value="4">4 — Strong Practical Knowledge</option>
                <option value="3">3 — Meets Basic Requirements</option>
                <option value="2">2 — Needs Guidance</option>
                <option value="1">1 — Unsatisfactory</option>
              </select>
            </div>

            <div>
              <label htmlFor="problemRating" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Problem Solving &amp; Logic (1 - 5)
              </label>
              <select
                id="problemRating"
                value={problemRating}
                onChange={(e) => setProblemRating(e.target.value)}
                className="w-full text-xs font-mono uppercase tracking-wider border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              >
                <option value="5">5 — Outstanding Algorithmic Rigor</option>
                <option value="4">4 — Clear Architectural Tradeoffs</option>
                <option value="3">3 — Solves With Assistance</option>
                <option value="2">2 — Struggled With Edge Cases</option>
                <option value="1">1 — Unable to Formulate Solution</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="commRating" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Communication &amp; Articulation (1 - 5)
              </label>
              <select
                id="commRating"
                value={commRating}
                onChange={(e) => setCommRating(e.target.value)}
                className="w-full text-xs font-mono uppercase tracking-wider border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              >
                <option value="5">5 — Highly Articulate &amp; Structured</option>
                <option value="4">4 — Clear and Methodical</option>
                <option value="3">3 — Adequate Clarity</option>
                <option value="2">2 — Unclear Explanations</option>
                <option value="1">1 — Poor Articulation</option>
              </select>
            </div>

            <div>
              <label htmlFor="recommendation" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Hiring Recommendation
              </label>
              <select
                id="recommendation"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value as any)}
                className="w-full text-xs font-mono uppercase tracking-wider border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              >
                <option value="strong_hire">Strong Hire</option>
                <option value="hire">Hire</option>
                <option value="neutral">Neutral / Re-evaluate</option>
                <option value="no_hire">No Hire</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
              Evaluator Technical Notes &amp; Observations
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Candidate's technical responses, project discussions, system design breakdown, and preparedness..."
              className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-3 focus:border-[#E42316] focus:outline-hidden leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-[#DEDEDE] flex items-center justify-end gap-3">
            <Link
              href={`/recruiter/applicants/${id}`}
              className="px-4 py-2 border border-[#DEDEDE] hover:border-[#080808] text-xs font-mono uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#E42316] hover:bg-[#0A0A0A] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Recording...
                </>
              ) : (
                'Commit Evaluation Scorecard'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CandidateEvaluationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
          <div className="w-8 h-8 border border-[#E42316] border-t-transparent animate-spin" />
        </div>
      }
    >
      <CandidateEvaluationPageInner />
    </Suspense>
  );
}
