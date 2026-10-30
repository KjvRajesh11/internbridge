'use client';

import React, { useState } from 'react';
import { CheckCircle2, Settings, Save } from 'lucide-react';

export default function RecruiterSettingsPage() {
  const [notifyOnNewApp, setNotifyOnNewApp] = useState(true);
  const [autoArchiveDays, setAutoArchiveDays] = useState('60');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white mb-3">
            <Settings className="w-3 h-3 text-[#E42316]" />
            Preferences &amp; Telemetry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Account Preferences &amp; Settings
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-2">
            Configure candidate arrival notifications and automated pipeline retention rules.
          </p>
        </div>

        {saved && (
          <div className="bg-[#F5F5F3] border-l-2 border-[#E42316] text-[#080808] p-4 text-xs font-mono flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#E42316] shrink-0" />
            <span>Preferences saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#777777]">
              Hiring Alerts &amp; Triggers
            </h2>

            <label className="flex items-center justify-between p-4 border border-[#DEDEDE] bg-[#F5F5F3] cursor-pointer hover:border-[#080808] transition-colors">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wide block">
                  Instant Candidate Submission Notification
                </span>
                <span className="text-xs font-mono text-[#777777] block">
                  Alert in-app and by notification whenever an eligible student applies.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifyOnNewApp}
                onChange={(e) => setNotifyOnNewApp(e.target.checked)}
                className="w-4 h-4 accent-[#E42316] cursor-pointer"
              />
            </label>
          </div>

          <div>
            <label htmlFor="archiveDays" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-2">
              Auto-Archive Closed Listings
            </label>
            <select
              id="archiveDays"
              value={autoArchiveDays}
              onChange={(e) => setAutoArchiveDays(e.target.value)}
              className="w-full text-xs font-mono uppercase tracking-wider border border-[#DEDEDE] bg-[#FFFFFF] p-2.5 focus:border-[#E42316] focus:outline-hidden"
            >
              <option value="30">After 30 days of application deadline</option>
              <option value="60">After 60 days of application deadline</option>
              <option value="90">After 90 days of application deadline</option>
            </select>
          </div>

          <div className="pt-4 border-t border-[#DEDEDE] flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
