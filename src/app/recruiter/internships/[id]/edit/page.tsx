'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/storage/db';
import { Internship } from '@/types';
import { ArrowLeft, CheckCircle2, AlertCircle, Briefcase, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

function EditInternshipPageInner() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [stipend, setStipend] = useState('');
  const [status, setStatus] = useState<string>('published');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    const intern = db.getInternship(id);
    if (intern) {
      setTitle(intern.title);
      setDescription(intern.description);
      setResponsibilities(intern.responsibilities);
      setRequiredSkills(intern.required_skills.join(', '));
      setStipend(intern.stipend);
      setStatus(intern.status);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      db.updateInternship(id, {
        title: title.trim(),
        description: description.trim(),
        responsibilities: responsibilities.trim(),
        required_skills: requiredSkills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        stipend: stipend.trim(),
        status: status as any,
      });
      setSaved(true);
      setTimeout(() => router.push('/recruiter/internships'), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-4">
          <Link
            href="/recruiter/internships"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#080808] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#E42316]" /> Back to Listings
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            EDIT LISTING // RECRUITER WORKSPACE
          </span>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>ROLE SPECIFICATION UPDATE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            EDIT INTERNSHIP LISTING
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Update role expectations, responsibilities, compensation, or publication status.
          </p>
        </div>

        {saved && (
          <div className="border-l-4 border-[#0A0A0A] bg-[#F5F5F3] text-[#080808] p-4 text-xs font-mono flex items-center gap-3">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span className="font-bold">Listing updated successfully. Returning to listings...</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="title" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
              Internship Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Publication Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs font-mono"
              >
                <option value="published">Published (Accepting Candidates)</option>
                <option value="draft">Internal Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label htmlFor="stipend" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Monthly Stipend
              </label>
              <input
                id="stipend"
                type="text"
                required
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="requiredSkills" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
              Required Skills (comma-separated)
            </label>
            <input
              id="requiredSkills"
              type="text"
              required
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              className="w-full text-xs font-mono"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
              Role Description
            </label>
            <textarea
              id="description"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              className="w-full text-xs font-mono leading-relaxed bg-[#F5F5F3]"
            />
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#DEDEDE]">
            <Link
              href="/recruiter/internships"
              className="font-mono text-xs uppercase tracking-wider font-bold text-[#777777] hover:text-[#080808]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Listing Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditInternshipPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs text-[#777777]">
          Loading listing editor...
        </div>
      }
    >
      <EditInternshipPageInner />
    </Suspense>
  );
}
