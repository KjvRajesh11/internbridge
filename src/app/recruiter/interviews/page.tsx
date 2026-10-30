'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/storage/db';
import { Application, Interview, InterviewSlot } from '@/types';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

function RecruiterInterviewsPageInner() {
  const searchParams = useSearchParams();
  const applicantParamId = searchParams.get('applicantId');

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [, setSlots] = useState<InterviewSlot[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState(applicantParamId || '');
  const [startTime, setStartTime] = useState('');
  const [durationMins, setDurationMins] = useState('45');
  const [meetingUrl, setMeetingUrl] = useState('https://meet.internbridge.internal/cloudscale-interview-room');
  const [instructions, setInstructions] = useState('Technical discussion on microservices and distributed queues.');
  const [scheduling, setScheduling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.company) {
          const list = db.getInterviews({ recruiterId: data.user.id });
          setInterviews(list);
          const sList = db.getInterviewSlots({ companyId: data.company.id });
          setSlots(sList);
          const apps = db.getApplications({ companyId: data.company.id });
          setApplications(apps);
          if (!selectedAppId && apps.length > 0) {
            setSelectedAppId(apps[0].id);
          }
        }
      });
  }, [applicantParamId, selectedAppId]);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;
    setScheduling(true);
    setError(null);
    setMessage(null);

    try {
      const start = startTime ? new Date(startTime).toISOString() : new Date(Date.now() + 86400000).toISOString();
      const end = new Date(new Date(start).getTime() + Number(durationMins) * 60000).toISOString();

      const res = await fetch('/api/interviews/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id: selectedAppId,
          start_time: start,
          end_time: end,
          timezone: 'Asia/Kolkata',
          interview_mode: 'video',
          meeting_url: meetingUrl,
          candidate_instructions: instructions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to schedule interview.');
        return;
      }

      setMessage('Interview successfully scheduled and notified to the student!');
      const updated = db.getInterviews();
      setInterviews(updated);
    } catch {
      setError('An error occurred during scheduling.');
    } finally {
      setScheduling(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white mb-3">
            <Calendar className="w-3 h-3 text-[#E42316]" />
            Interview Operations &amp; Coordination
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Interview Coordination &amp; Slot Booking
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-2">
            Coordinate technical and behavioral rounds with candidates. Enforces atomic conflict-free slot booking.
          </p>
        </div>

        {message && (
          <div className="bg-[#F5F5F3] border-l-2 border-[#E42316] text-[#080808] p-4 text-xs font-mono flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#E42316] shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="bg-[#F5F5F3] border-l-2 border-[#0A0A0A] text-[#080808] p-4 text-xs font-mono flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#E42316] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Two Column Layout: Schedule Form + Scheduled List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Schedule Form */}
          <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-5">
            <div className="pb-3 border-b border-[#DEDEDE]">
              <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
                Schedule Candidate
              </h2>
            </div>

            <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                  Select Candidate
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  className="w-full text-xs font-mono uppercase tracking-wider border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
                >
                  {applications.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.student?.full_name} ({a.internship?.title})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                  Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                  Duration
                </label>
                <select
                  value={durationMins}
                  onChange={(e) => setDurationMins(e.target.value)}
                  className="w-full text-xs font-mono uppercase tracking-wider border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                  Meeting URL
                </label>
                <input
                  type="url"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                  Candidate Instructions
                </label>
                <textarea
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={scheduling}
                className="w-full py-3 bg-[#E42316] hover:bg-[#0A0A0A] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                {scheduling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Scheduling Interview...
                  </>
                ) : (
                  'Confirm & Notify Candidate'
                )}
              </button>
            </form>
          </div>

          {/* Scheduled List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDEDE]">
              <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
                Confirmed Upcoming Interviews
              </h2>
              <span className="text-xs font-mono text-[#777777]">
                {interviews.length} Scheduled
              </span>
            </div>
            <div className="space-y-3">
              {interviews.length === 0 ? (
                <div className="border border-[#DEDEDE] bg-[#F5F5F3] p-12 text-center text-xs font-mono uppercase tracking-wider text-[#777777]">
                  No upcoming interviews scheduled.
                </div>
              ) : (
                interviews.map((intItem) => (
                  <div
                    key={intItem.id}
                    className="border border-[#DEDEDE] bg-[#FFFFFF] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#E42316] font-bold block">
                        Candidate: {intItem.application?.student?.full_name}
                      </span>
                      <h3 className="text-base font-bold uppercase tracking-wide">
                        {intItem.application?.internship?.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#777777] uppercase tracking-wider pt-1">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#080808]" />
                          {new Date(intItem.start_time).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#080808]" />
                          {new Date(intItem.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {intItem.meeting_url && (
                      <a
                        href={intItem.meeting_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        <Video className="w-3.5 h-3.5 text-[#E42316]" /> Launch Video
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecruiterInterviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
          <div className="w-8 h-8 border border-[#E42316] border-t-transparent animate-spin" />
        </div>
      }
    >
      <RecruiterInterviewsPageInner />
    </Suspense>
  );
}
