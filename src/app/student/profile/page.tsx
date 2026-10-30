'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Profile } from '@/types';
import { User, Mail, GraduationCap, MapPin, CheckCircle2, Building, BookOpen, Calendar, Award } from 'lucide-react';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [degree, setDegree] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState<number>(2026);
  const [gpa, setGpa] = useState<number>(8.5);
  const [summary, setSummary] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setProfile(data.user);
          setName(data.user.full_name);
          setEducation(data.user.education || '');
          setDegree(data.user.degree || '');
          setDepartment(data.user.department || '');
          setGraduationYear(data.user.graduation_year || 2026);
          setGpa(data.user.gpa || 8.5);
          setSummary(data.user.professional_summary || '');
        }
      });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    db.updateProfile(profile.id, {
      full_name: name,
      education,
      degree,
      department,
      graduation_year: Number(graduationYear),
      gpa: Number(gpa),
      professional_summary: summary,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b-2 border-[#0A0A0A] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>ACADEMIC IDENTITY &amp; VERIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            STUDENT PROFILE
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Academic credentials and verified bio used for automated qualification screening.
          </p>
        </div>

        {saved && (
          <div className="border-l-4 border-[#0A0A0A] bg-[#F5F5F3] text-[#080808] p-4 text-xs font-mono flex items-center gap-3">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span className="font-bold">Profile changes saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Email Address (Verified Identity)
              </label>
              <input
                type="email"
                disabled
                value={profile?.email || ''}
                className="w-full bg-[#F5F5F3] border border-[#DEDEDE] p-3 text-xs text-[#777777] cursor-not-allowed font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
              Institution / University
            </label>
            <input
              type="text"
              required
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. National Institute of Technology"
              className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Degree Program
              </label>
              <input
                type="text"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.Tech"
                className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Department / Major
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Graduation Cohort Year
              </label>
              <input
                type="number"
                required
                min={2023}
                max={2030}
                value={graduationYear}
                onChange={(e) => setGraduationYear(Number(e.target.value))}
                className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
                Cumulative GPA / CGPA (out of 10.0)
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={10}
                required
                value={gpa}
                onChange={(e) => setGpa(Number(e.target.value))}
                className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#080808] font-mono focus:border-[#E42316] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-1.5">
              Professional Summary &amp; Bio
            </label>
            <textarea
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief overview of your engineering passions, core technical domains, and career goals..."
              className="w-full bg-white border border-[#DEDEDE] p-3 text-xs text-[#080808] font-sans leading-relaxed focus:border-[#E42316] outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#DEDEDE]">
            <span className="font-mono text-[11px] text-[#777777] uppercase">
              Factual details are verified against Agent 4 Eligibility Guard checks.
            </span>
            <button
              type="submit"
              className="px-8 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
