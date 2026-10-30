'use client';

import React, { useState, useEffect } from 'react';
import { Internship } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import { ApplyModal } from '@/components/ApplyModal';
import {
  Search,
  MapPin,
  Briefcase,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';

export default function InternshipsDiscoveryPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [search, setSearch] = useState('');
  const [workMode, setWorkMode] = useState('all');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    loadInternships();
  }, [search, workMode]);

  const loadInternships = () => {
    const params = new URLSearchParams();
    params.set('status', 'published');
    if (search) params.set('search', search);
    if (workMode !== 'all') params.set('workMode', workMode);

    fetch(`/api/internships?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.internships) setInternships(data.internships);
      })
      .catch(() => {});
  };

  const handleApplyClick = (intern: Internship) => {
    setSelectedInternship(intern);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white">
            <span className="w-1.5 h-1.5 bg-[#E42316]" />
            Active Recruitment Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight">
            Discover Verified Internships
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            Direct engineering positions from leading tech employers. Enforced with one-application-per-internship integrity protection.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="border border-[#DEDEDE] bg-[#FFFFFF] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, company, skill (Go, React, PyTorch)..."
              className="w-full bg-[#FFFFFF] border border-[#DEDEDE] pl-10 pr-4 py-2.5 text-xs font-mono text-[#080808] placeholder:text-[#777777] focus:border-[#E42316] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#777777] flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#080808]" /> Mode:
            </span>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="bg-[#FFFFFF] border border-[#DEDEDE] px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#080808] focus:border-[#E42316] focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Modes</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="in-office">In-Office</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {internships.length === 0 ? (
            <div className="text-center py-16 border border-[#DEDEDE] bg-[#F5F5F3] p-8 space-y-3">
              <Briefcase className="w-8 h-8 text-[#777777] mx-auto" />
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold">No internships match your filter criteria</h3>
              <p className="text-xs font-mono text-[#777777] uppercase max-w-sm mx-auto">
                Try adjusting your search query or selecting &quot;All Modes&quot; to see all open positions.
              </p>
            </div>
          ) : (
            internships.map((intern) => (
              <div
                key={intern.id}
                className="border border-[#DEDEDE] hover:border-[#080808] bg-[#FFFFFF] p-6 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#E42316]">
                      {intern.company?.name}
                    </span>
                    <span className="text-[#DEDEDE]">•</span>
                    <StatusBadge status={intern.work_mode} size="sm" />
                    <span className="text-[#DEDEDE]">•</span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#777777] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#777777]" />
                      {intern.location}
                    </span>
                  </div>

                  <Link href={`/internships/${intern.id}`} className="block group">
                    <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-[#E42316] transition-colors">
                      {intern.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#080808] line-clamp-2 leading-relaxed">
                    {intern.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {intern.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#F5F5F3] border border-[#DEDEDE] text-[10px] font-mono uppercase tracking-wider text-[#080808]"
                      >
                        {skill}
                      </span>
                    ))}
                    {intern.minimum_gpa > 0 && (
                      <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-mono uppercase tracking-wider">
                        Min GPA: {intern.minimum_gpa}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Side */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#DEDEDE] gap-4 shrink-0">
                  <div className="text-left md:text-right space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
                      Stipend
                    </span>
                    <span className="text-sm font-mono font-bold text-[#080808] block">
                      {intern.stipend}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
                      Closes: {new Date(intern.application_deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/internships/${intern.id}`}
                      className="px-4 py-2 border border-[#DEDEDE] hover:border-[#080808] text-xs font-mono uppercase tracking-wider text-[#080808] transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleApplyClick(intern)}
                      className="px-5 py-2 bg-[#E42316] hover:bg-[#0A0A0A] text-white text-xs font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Apply Modal */}
        {selectedInternship && (
          <ApplyModal
            internship={selectedInternship}
            isOpen={isApplyModalOpen}
            onClose={() => setIsApplyModalOpen(false)}
            onSuccess={() => loadInternships()}
          />
        )}
      </div>
    </div>
  );
}
