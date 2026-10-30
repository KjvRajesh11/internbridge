'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { Company } from '@/types';
import { Building, CheckCircle2, Save } from 'lucide-react';

export default function RecruiterCompanyPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.company) {
          setCompany(data.company);
          setName(data.company.name);
          setDescription(data.company.description || '');
          setWebsite(data.company.website || '');
          setIndustry(data.company.industry || '');
          setLocation(data.company.location || '');
        }
      });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    const updated = {
      ...company,
      name: name.trim(),
      description: description.trim(),
      website: website.trim(),
      industry: industry.trim(),
      location: location.trim(),
      updated_at: new Date().toISOString(),
    };
    db.companies.set(company.id, updated);
    setCompany(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white mb-3">
            <Building className="w-3 h-3 text-[#E42316]" />
            Organization &amp; Employer Identity
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Company Profile &amp; Brand Settings
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-2">
            Manage your organization information, industry categorization, and verified office headquarters.
          </p>
        </div>

        {saved && (
          <div className="bg-[#F5F5F3] border-l-2 border-[#E42316] text-[#080808] p-4 text-xs font-mono flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#E42316] shrink-0" />
            <span>Company profile committed successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Company Legal Name
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Official Website URL
              </label>
              <input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="industry" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Industry Sector
              </label>
              <input
                id="industry"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Distributed Cloud & Enterprise SaaS"
                className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
                Headquarters Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India"
                className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
              Company Mission &amp; Overview
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your engineering culture, tech stack, and internship mentorship structure..."
              className="w-full text-xs font-mono border border-[#DEDEDE] bg-[#FFFFFF] p-3 focus:border-[#E42316] focus:outline-hidden leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-[#DEDEDE]">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              Save Company Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
