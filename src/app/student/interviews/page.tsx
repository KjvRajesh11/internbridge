'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Interview } from '@/types';
import {
  Calendar,
  Clock,
  Video,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';
import Link from 'next/link';

export default function StudentInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          const userInterviews = db.getInterviews({ studentId: data.user.id });
          setInterviews(userInterviews);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b-2 border-[#0A0A0A] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>CONFIRMED SESSIONS &amp; REHEARSALS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            INTERVIEW CALENDAR
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Confirmed interview rounds with hiring managers, joining links, and AI rehearsal preparation sheets.
          </p>
        </div>

        <div className="space-y-4">
          {interviews.length === 0 ? (
            <div className="border-2 border-dashed border-[#DEDEDE] p-16 text-center space-y-4">
              <Calendar className="w-10 h-10 text-[#777777] mx-auto" />
              <h3 className="text-base font-black text-[#080808] uppercase tracking-tight">No interviews scheduled yet</h3>
              <p className="font-mono text-xs text-[#777777] max-w-sm mx-auto uppercase">
                Once recruiters review and shortlist your application, interview invitations and video links will appear here.
              </p>
            </div>
          ) : (
            interviews.map((intItem) => (
              <div
                key={intItem.id}
                className="border border-[#DEDEDE] hover:border-[#0A0A0A] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors bg-white"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-[#E42316] uppercase">
                      {intItem.application?.internship?.company?.name || 'Partner Company'}
                    </span>
                    <span className="text-[#DEDEDE]">•</span>
                    <span className="text-[#080808] font-bold uppercase">
                      Confirmed Booking
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-[#080808] uppercase tracking-tight">
                    {intItem.application?.internship?.title || 'Technical Round'}
                  </h2>

                  <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-[#777777]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#080808]" />
                      <span>{new Date(intItem.start_time).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#080808]" />
                      <span>
                        {new Date(intItem.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                        ({intItem.timezone})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-[#E42316]" />
                      <span className="uppercase">{intItem.interview_mode} Meeting</span>
                    </div>
                  </div>

                  {intItem.candidate_instructions && (
                    <p className="text-xs text-[#080808] bg-[#F5F5F3] p-3 border border-[#DEDEDE] font-mono leading-relaxed">
                      <strong className="text-[#E42316] uppercase">Instructions: </strong>
                      {intItem.candidate_instructions}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#DEDEDE]">
                  {intItem.meeting_url && (
                    <a
                      href={intItem.meeting_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors text-center"
                    >
                      Join Meeting
                    </a>
                  )}
                  <Link
                    href={`/student/interviews/${intItem.application_id}/prep`}
                    className="px-5 py-2.5 border border-[#0A0A0A] hover:bg-[#F5F5F3] text-[#080808] font-mono text-xs uppercase tracking-wider font-bold transition-colors text-center"
                  >
                    AI Prep Sheet
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
