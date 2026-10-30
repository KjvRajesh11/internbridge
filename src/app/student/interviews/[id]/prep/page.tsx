'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  HelpCircle,
  Lightbulb,
  ListChecks,
} from 'lucide-react';
import Link from 'next/link';

function InterviewPrepWorkspacePageInner() {
  const params = useParams();
  const applicationId = params?.id as string;

  const [prepSheet, setPrepSheet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    if (!applicationId) return;

    fetch(`/api/applications`)
      .then((res) => res.json())
      .then((data) => {
        const app = data.applications?.find((a: any) => a.id === applicationId);
        if (app) {
          fetch('/api/agents/prep', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ internshipId: app.internship_id }),
          })
            .then((res) => res.json())
            .then((pData) => {
              if (pData.prepSheet) {
                setPrepSheet(pData.prepSheet);
                if (pData.prepSheet.technicalQuestions?.length > 0) {
                  setSelectedQuestion(pData.prepSheet.technicalQuestions[0].question);
                }
              }
            });
        }
      })
      .finally(() => setLoading(false));
  }, [applicationId]);

  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!practiceAnswer.trim()) return;

    setEvaluating(true);
    setEvaluationResult(null);

    try {
      const res = await fetch('/api/agents/evaluate-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: selectedQuestion,
          studentAnswer: practiceAnswer,
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvaluationResult(data.evaluation);
      }
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-[#777777] uppercase tracking-wider py-20">
        Synthesizing role-specific interview preparation sheet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/student/interviews"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#E42316]" /> Back to Interviews Calendar
        </Link>

        {/* Header */}
        <div className="border-2 border-[#0A0A0A] bg-white p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>AGENT 5 CAREER OPERATIONS &amp; PREPARATION</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#080808] uppercase tracking-tight">
            AI INTERVIEW PREPARATION WORKSPACE
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider">
            Tailored rehearsal for <strong className="text-[#080808]">{prepSheet?.internshipTitle}</strong> at{' '}
            <strong className="text-[#080808]">{prepSheet?.companyName}</strong> based on verified candidate skills.
          </p>
        </div>

        {/* Interactive Mock Interview Practice Sandbox */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DEDEDE] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E42316]" />
              <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Interactive Mock Answer Sandbox</h2>
            </div>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F3] text-[#080808] border border-[#DEDEDE] uppercase">
              Agent 5 Rubric Feedback
            </span>
          </div>

          <form onSubmit={handleEvaluateAnswer} className="space-y-4">
            <div>
              <label htmlFor="practiceQuestion" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Select Question to Practice:
              </label>
              <select
                id="practiceQuestion"
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                className="w-full text-xs font-mono"
              >
                {prepSheet?.technicalQuestions?.map((q: any, i: number) => (
                  <option key={i} value={q.question}>
                    [Technical] {q.question}
                  </option>
                ))}
                {prepSheet?.behavioralQuestions?.map((q: any, i: number) => (
                  <option key={`b-${i}`} value={q.question}>
                    [Behavioral] {q.question}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="practiceAnswer" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Your Practice Response:
              </label>
              <textarea
                id="practiceAnswer"
                rows={4}
                value={practiceAnswer}
                onChange={(e) => setPracticeAnswer(e.target.value)}
                placeholder="Structure your answer with situation, actions, technical tradeoffs, and measurable outcomes..."
                className="w-full text-xs leading-relaxed font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={evaluating || !practiceAnswer.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#E42316] hover:bg-[#0A0A0A] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              {evaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Evaluating Response...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Evaluate Answer with AI
                </>
              )}
            </button>
          </form>

          {/* Evaluation Output */}
          {evaluationResult && (
            <div className="bg-[#F5F5F3] border border-[#DEDEDE] p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-3">
                <span className="font-mono font-bold text-[#080808] uppercase tracking-wider">Evaluation Scorecard</span>
                <span className="px-3 py-1 bg-[#0A0A0A] text-white font-mono text-xs font-bold">
                  Rubric Score: {evaluationResult.score} / 10
                </span>
              </div>
              <p className="text-[#080808] leading-relaxed font-sans">{evaluationResult.feedback}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 border border-[#DEDEDE] space-y-1.5 font-mono text-xs">
                  <span className="font-bold text-[#080808] uppercase block">Identified Strengths:</span>
                  <ul className="list-disc list-inside text-[#777777] space-y-0.5">
                    {evaluationResult.strengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 border border-[#DEDEDE] space-y-1.5 font-mono text-xs">
                  <span className="font-bold text-[#E42316] uppercase block">Areas for Refinement:</span>
                  <ul className="list-disc list-inside text-[#777777] space-y-0.5">
                    {evaluationResult.improvements?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technical Questions List */}
        <div className="space-y-4">
          <h2 className="font-mono text-base font-black text-[#080808] uppercase tracking-tight">
            Anticipated Technical Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prepSheet?.technicalQuestions?.map((tq: any, i: number) => (
              <div key={i} className="border border-[#DEDEDE] p-5 space-y-3 bg-white hover:border-[#0A0A0A] transition-colors">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#E42316] block">
                  Focus: {tq.topic}
                </span>
                <h3 className="text-sm font-bold text-[#080808] leading-snug">{tq.question}</h3>
                <div className="text-xs text-[#777777] space-y-1 pt-2 border-t border-[#DEDEDE]">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#080808] block">Key Discussion Points:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[#777777] text-xs">
                    {tq.idealAnswerPoints?.map((pt: string, pIdx: number) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral Prompts */}
        <div className="space-y-4">
          <h2 className="font-mono text-base font-black text-[#080808] uppercase tracking-tight">
            STAR Behavioral Prompts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prepSheet?.behavioralQuestions?.map((bq: any, i: number) => (
              <div key={i} className="border border-[#DEDEDE] p-5 space-y-3 bg-white hover:border-[#0A0A0A] transition-colors">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#080808] block">
                  Framework: {bq.framework}
                </span>
                <h3 className="text-sm font-bold text-[#080808] leading-snug">{bq.question}</h3>
                <ul className="text-xs text-[#777777] list-disc list-inside space-y-0.5 pt-2 border-t border-[#DEDEDE]">
                  {bq.suggestedPoints?.map((pt: string, pIdx: number) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Interview Checklist */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#DEDEDE]">
            <span className="w-2 h-2 bg-[#E42316]" />
            <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Pre-Interview Preparation Checklist</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#080808]">
            {prepSheet?.revisionChecklist?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2.5 bg-[#F5F5F3] p-3 border border-[#DEDEDE]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E42316] mt-1 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterviewPrepWorkspacePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-[#777777]">
          Loading prep workspace...
        </div>
      }
    >
      <InterviewPrepWorkspacePageInner />
    </Suspense>
  );
}
