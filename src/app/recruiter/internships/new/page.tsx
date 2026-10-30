'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  GraduationCap,
  Award,
  Layers,
  Save,
  Send,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

export default function NewInternshipPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [preferredSkills, setPreferredSkills] = useState('');
  const [minimumGpa, setMinimumGpa] = useState('7.5');
  const [gradYears, setGradYears] = useState('2026, 2027');
  const [location, setLocation] = useState('Bengaluru, India');
  const [workMode, setWorkMode] = useState<'remote' | 'hybrid' | 'in-office'>('hybrid');
  const [duration, setDuration] = useState('6 Months');
  const [stipend, setStipend] = useState('₹50,000 / month');
  const [openings, setOpenings] = useState('2');
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<'publish' | 'draft'>('publish');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (targetStatus: 'published' | 'draft') => {
    if (!title.trim() || !description.trim()) {
      setError('Please provide at least an internship title and role description.');
      return;
    }

    setLoading(true);
    setActionType(targetStatus === 'published' ? 'publish' : 'draft');
    setError(null);

    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          responsibilities: responsibilities.trim(),
          required_skills: requiredSkills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          preferred_skills: preferredSkills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          minimum_gpa: Number(minimumGpa) || 0,
          accepted_graduation_years: gradYears
            .split(',')
            .map((y) => Number(y.trim()))
            .filter(Boolean),
          location: location.trim(),
          work_mode: workMode,
          duration: duration.trim(),
          stipend: stipend.trim(),
          application_deadline: deadline ? new Date(deadline).toISOString() : undefined,
          openings_count: Number(openings) || 1,
          status: targetStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to record internship opportunity.');
        return;
      }

      router.push('/recruiter/internships');
    } catch {
      setError('A network error occurred while publishing. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-4">
          <Link
            href="/recruiter/internships"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#E42316]" /> Back to Listings
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            RECRUITER WORKSPACE // DDL DRAFTING
          </span>
        </div>

        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>ROLE SPECIFICATION GATEWAY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight">
            POST NEW INTERNSHIP ROLE
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider">
            Specify technical match criteria, academic cutoffs, and compensation details.
          </p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="border-l-4 border-[#E42316] bg-[#F5F5F3] text-[#080808] p-4 text-xs font-mono flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#E42316] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase tracking-wider text-[#E42316]">Unable to publish opportunity</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Form Container: Two Columns on Desktop */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('published');
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Column (2 spans): Role Description & Core Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Core Information */}
            <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#DEDEDE]">
                <span className="w-2 h-2 bg-[#E42316]" />
                <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Role Specifications</h2>
              </div>

              <div>
                <label htmlFor="title" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Internship Title <span className="text-[#E42316]">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Cloud Platform Engineering Intern"
                  className="w-full text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="workMode" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                    Work Mode <span className="text-[#E42316]">*</span>
                  </label>
                  <select
                    id="workMode"
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as any)}
                    className="w-full text-xs font-mono"
                  >
                    <option value="hybrid">Hybrid (Office + Remote)</option>
                    <option value="remote">Fully Remote</option>
                    <option value="in-office">In-Office</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="openings" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                    Target Openings Count
                  </label>
                  <input
                    id="openings"
                    type="number"
                    min="1"
                    max="100"
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                    className="w-full text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Description &amp; Role Overview <span className="text-[#E42316]">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the engineering team, architecture goals, mentorship, and mission..."
                  className="w-full text-xs leading-relaxed font-sans"
                />
              </div>

              <div>
                <label htmlFor="responsibilities" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Key Responsibilities
                </label>
                <textarea
                  id="responsibilities"
                  rows={4}
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  placeholder="1. Build high-throughput microservices using Go and PostgreSQL.&#10;2. Implement automated unit and integration tests.&#10;3. Partner with senior architects on observability and distributed tracing."
                  className="w-full text-xs font-mono leading-relaxed bg-[#F5F5F3]"
                />
              </div>
            </div>

            {/* Card 2: Technical Skills */}
            <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#DEDEDE]">
                <span className="w-2 h-2 bg-[#E42316]" />
                <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Technical Skills Match Criteria</h2>
              </div>

              <div>
                <label htmlFor="requiredSkills" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Required Skills <span className="text-[#E42316]">*</span>
                  <span className="text-[10px] text-[#777777] ml-2 normal-case font-normal">
                    (Evaluated at 40% weight by Agent 1)
                  </span>
                </label>
                <input
                  id="requiredSkills"
                  type="text"
                  required
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  placeholder="e.g. Go, TypeScript, PostgreSQL, Docker, Data Structures"
                  className="w-full text-xs font-mono"
                />
              </div>

              <div>
                <label htmlFor="preferredSkills" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Preferred / Nice-to-Have Skills
                  <span className="text-[10px] text-[#777777] ml-2 normal-case font-normal">
                    (Evaluated at 20% weight)
                  </span>
                </label>
                <input
                  id="preferredSkills"
                  type="text"
                  value={preferredSkills}
                  onChange={(e) => setPreferredSkills(e.target.value)}
                  placeholder="e.g. Kubernetes, Redis, Prometheus, gRPC"
                  className="w-full text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Right Column (1 span): Eligibility, Logistics & Publication */}
          <div className="space-y-6">
            {/* Card 3: Academic Eligibility */}
            <div className="border border-[#DEDEDE] bg-white p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#DEDEDE]">
                <span className="w-2 h-2 bg-[#E42316]" />
                <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Academic Eligibility</h2>
              </div>

              <div>
                <label htmlFor="minimumGpa" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Minimum GPA / CGPA Cutoff
                </label>
                <input
                  id="minimumGpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={minimumGpa}
                  onChange={(e) => setMinimumGpa(e.target.value)}
                  className="w-full text-xs font-mono"
                />
                <p className="font-mono text-[10px] text-[#777777] mt-1 uppercase">
                  Enforced strictly by Agent 4 Integrity Guard.
                </p>
              </div>

              <div>
                <label htmlFor="gradYears" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Accepted Graduation Cohorts
                </label>
                <input
                  id="gradYears"
                  type="text"
                  value={gradYears}
                  onChange={(e) => setGradYears(e.target.value)}
                  placeholder="2026, 2027"
                  className="w-full text-xs font-mono"
                />
                <p className="font-mono text-[10px] text-[#777777] mt-1 uppercase">
                  Comma-separated graduation cohorts.
                </p>
              </div>
            </div>

            {/* Card 4: Logistics & Compensation */}
            <div className="border border-[#DEDEDE] bg-white p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#DEDEDE]">
                <span className="w-2 h-2 bg-[#E42316]" />
                <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Logistics &amp; Terms</h2>
              </div>

              <div>
                <label htmlFor="location" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Location / Office Base
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru, India"
                  className="w-full text-xs font-mono"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Internship Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 6 Months (Jan - Jun)"
                  className="w-full text-xs font-mono"
                />
              </div>

              <div>
                <label htmlFor="stipend" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Monthly Stipend
                </label>
                <input
                  id="stipend"
                  type="text"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  placeholder="e.g. ₹50,000 / month"
                  className="w-full text-xs font-mono"
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                  Application Deadline
                </label>
                <input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full text-xs font-mono"
                />
              </div>
            </div>

            {/* Card 5: Action Panel */}
            <div className="border-2 border-[#0A0A0A] bg-white p-6 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#E42316] hover:bg-[#0A0A0A] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading && actionType === 'publish' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing Opportunity...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Publish Internship Opportunity
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleSubmit('draft')}
                className="w-full py-3 px-4 border border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] hover:text-white text-[#080808] font-mono text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading && actionType === 'draft' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Draft...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-[#E42316]" />
                    Save as Internal Draft
                  </>
                )}
              </button>

              <Link
                href="/recruiter/internships"
                className="block text-center font-mono text-[11px] uppercase tracking-wider text-[#777777] hover:text-[#080808] pt-2 transition-colors font-bold"
              >
                Cancel and return to listings
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
