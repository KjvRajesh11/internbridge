'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Internship } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import { ApplyModal } from '@/components/ApplyModal';
import {
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

function InternshipDetailPageInner() {
  const params = useParams();
  const id = params?.id as string;

  const [internship, setInternship] = useState<Internship | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/internships/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.internship) {
          setInternship(data.internship);
          setHasApplied(Boolean(data.hasApplied));
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center py-20 text-xs font-mono uppercase tracking-widest text-[#777777]">
        Loading internship specification...
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight">Internship Not Found</h2>
        <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">The requested listing may have expired or was removed.</p>
        <Link
          href="/internships"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] text-white text-xs font-mono uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back button */}
        <Link
          href="/internships"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all listings
        </Link>

        {/* Main Header Card */}
        <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#DEDEDE]">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#E42316] block">
                {internship.company?.name}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
                {internship.title}
              </h1>
            </div>
            <StatusBadge status={internship.work_mode} />
          </div>

          {/* Quick Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5F5F3] border border-[#DEDEDE] text-xs font-mono">
            <div>
              <span className="text-[#777777] block text-[10px] uppercase tracking-wider">Location</span>
              <span className="font-bold uppercase tracking-wider flex items-center gap-1 mt-1 text-[#080808]">
                <MapPin className="w-3 h-3 text-[#E42316]" />
                {internship.location}
              </span>
            </div>
            <div>
              <span className="text-[#777777] block text-[10px] uppercase tracking-wider">Duration</span>
              <span className="font-bold uppercase tracking-wider flex items-center gap-1 mt-1 text-[#080808]">
                <Clock className="w-3 h-3 text-[#E42316]" />
                {internship.duration}
              </span>
            </div>
            <div>
              <span className="text-[#777777] block text-[10px] uppercase tracking-wider">Stipend</span>
              <span className="font-bold uppercase tracking-wider flex items-center gap-1 mt-1 text-[#080808]">
                <Briefcase className="w-3 h-3 text-[#E42316]" />
                {internship.stipend}
              </span>
            </div>
            <div>
              <span className="text-[#777777] block text-[10px] uppercase tracking-wider">Deadline</span>
              <span className="font-bold uppercase tracking-wider flex items-center gap-1 mt-1 text-[#080808]">
                <Calendar className="w-3 h-3 text-[#E42316]" />
                {new Date(internship.application_deadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Apply CTA Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#DEDEDE]">
            <div className="text-xs font-mono">
              {hasApplied ? (
                <span className="text-[#080808] flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#E42316]" />
                  Application already on file for this position.
                </span>
              ) : (
                <span className="text-[#777777] uppercase tracking-wider">
                  Verified position. Single application policy enforced.
                </span>
              )}
            </div>
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {hasApplied ? 'View Application Record' : 'Apply for this Role'}
            </button>
          </div>
        </div>

        {/* Description & Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold pb-2 border-b border-[#DEDEDE]">
                Role Overview
              </h3>
              <p className="text-xs text-[#080808] leading-relaxed whitespace-pre-line">
                {internship.description}
              </p>
            </div>

            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold pb-2 border-b border-[#DEDEDE]">
                Key Responsibilities &amp; Deliverables
              </h3>
              <div className="border border-[#DEDEDE] bg-[#F5F5F3] p-4 font-mono text-xs text-[#080808] leading-relaxed whitespace-pre-line">
                {internship.responsibilities}
              </div>
            </div>
          </div>

          {/* Sidebar: Skills & Eligibility */}
          <div className="space-y-6">
            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold pb-2 border-b border-[#DEDEDE]">
                Required Competencies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {internship.required_skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-mono uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {internship.preferred_skills.length > 0 && (
                <>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#777777] pt-2">
                    Preferred Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {internship.preferred_skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#F5F5F3] border border-[#DEDEDE] text-[10px] font-mono uppercase tracking-wider text-[#080808]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold pb-2 border-b border-[#DEDEDE]">
                Academic Requirements
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#DEDEDE]">
                  <span className="text-[#777777] uppercase">Min GPA</span>
                  <span className="font-bold text-[#080808]">
                    {internship.minimum_gpa > 0 ? internship.minimum_gpa : 'None'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DEDEDE]">
                  <span className="text-[#777777] uppercase">Graduation Cohort</span>
                  <span className="font-bold text-[#080808]">
                    {internship.accepted_graduation_years?.join(', ') || 'Any Year'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#777777] uppercase">Degree Program</span>
                  <span className="font-bold text-[#080808]">
                    {internship.eligibility_rules?.allowed_degrees?.join(', ') || 'Any'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Modal */}
        {isApplyModalOpen && (
          <ApplyModal
            internship={internship}
            isOpen={isApplyModalOpen}
            onClose={() => setIsApplyModalOpen(false)}
            onSuccess={() => setHasApplied(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function InternshipDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
          <div className="w-8 h-8 border border-[#E42316] border-t-transparent animate-spin" />
        </div>
      }
    >
      <InternshipDetailPageInner />
    </Suspense>
  );
}
