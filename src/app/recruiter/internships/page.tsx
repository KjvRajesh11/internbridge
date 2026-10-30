'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Internship } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import { Plus, Briefcase, Calendar, MapPin, Edit3, ArrowRight, Users, Clock } from 'lucide-react';
import Link from 'next/link';

export default function RecruiterInternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.company) {
          const list = db.getInternships({ companyId: data.company.id });
          setInternships(list);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b-2 border-[#0A0A0A]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
              <span className="w-2 h-2 bg-[#E42316]" />
              <span>ROLE INVENTORY &amp; MANAGEMENT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
              PUBLISHED INTERNSHIPS
            </h1>
            <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
              Publish positions, configure cutoffs, and monitor real-time candidate volumes.
            </p>
          </div>
          <Link
            href="/recruiter/internships/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Post New Role
          </Link>
        </div>

        {/* Listings List */}
        <div className="space-y-4">
          {internships.length === 0 ? (
            <div className="border-2 border-dashed border-[#DEDEDE] p-16 text-center space-y-4">
              <Briefcase className="w-10 h-10 text-[#777777] mx-auto" />
              <h3 className="text-base font-black text-[#080808] uppercase tracking-tight">No published internships yet</h3>
              <p className="font-mono text-xs text-[#777777] max-w-md mx-auto uppercase">
                Post your company&apos;s first internship role to start matching with qualified candidates.
              </p>
              <Link
                href="/recruiter/internships/new"
                className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
              >
                <Plus className="w-4 h-4" /> Create First Listing
              </Link>
            </div>
          ) : (
            internships.map((intern) => {
              const apps = db.getApplications({ internshipId: intern.id });
              return (
                <div
                  key={intern.id}
                  className="border border-[#DEDEDE] hover:border-[#0A0A0A] p-6 transition-colors bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={intern.status} size="sm" />
                      <span className="text-[#DEDEDE]">•</span>
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-[#F5F5F3] text-[#080808] border border-[#DEDEDE]">
                        {intern.work_mode}
                      </span>
                      <span className="text-[#DEDEDE]">•</span>
                      <span className="font-mono text-xs text-[#777777] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#080808]" />
                        {intern.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#080808] uppercase tracking-tight">{intern.title}</h3>

                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {intern.required_skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 bg-[#F5F5F3] text-[#080808] font-mono text-[10px] border border-[#DEDEDE]"
                        >
                          {skill}
                        </span>
                      ))}
                      {intern.minimum_gpa > 0 && (
                        <span className="px-2.5 py-0.5 bg-white text-[#E42316] font-mono text-[10px] font-bold border border-[#E42316]">
                          Min GPA: {intern.minimum_gpa}
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 bg-[#F5F5F3] text-[#777777] font-mono text-[10px] border border-[#DEDEDE]">
                        {intern.duration}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#F5F5F3] text-[#080808] font-mono text-[10px] font-bold border border-[#DEDEDE]">
                        {intern.stipend}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#DEDEDE] pt-4 md:pt-0 shrink-0">
                    <div className="text-left md:text-right font-mono">
                      <span className="text-xs font-bold text-[#080808] block uppercase">
                        {apps.length} {apps.length === 1 ? 'Applicant' : 'Applicants'}
                      </span>
                      <span className="text-[10px] text-[#777777] block mt-0.5">
                        Deadline: {new Date(intern.application_deadline).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/recruiter/internships/${intern.id}/edit`}
                        className="p-2 border border-[#0A0A0A] hover:bg-[#F5F5F3] text-[#080808] transition-colors"
                        title="Edit Listing"
                      >
                        <Edit3 className="w-4 h-4 text-[#E42316]" />
                      </Link>
                      <Link
                        href={`/recruiter/applicants?internshipId=${intern.id}`}
                        className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                      >
                        View Candidates
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
