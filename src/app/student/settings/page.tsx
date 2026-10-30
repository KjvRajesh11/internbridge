'use client';

import React, { useState } from 'react';
import { db } from '@/lib/storage/db';
import { Shield, Bell, CheckCircle2, Sliders, Lock } from 'lucide-react';

export default function StudentSettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [inAppNotifs, setInAppNotifs] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b-2 border-[#0A0A0A] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>ACCOUNT &amp; PRIVACY CONFIGURATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            USER SETTINGS
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Configure notification channels, communication frequency, and privacy controls.
          </p>
        </div>

        {saved && (
          <div className="border-l-4 border-[#0A0A0A] bg-[#F5F5F3] text-[#080808] p-4 text-xs font-mono flex items-center gap-3">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span className="font-bold">Settings saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider">
              Notification Preferences
            </h2>

            <label className="flex items-center justify-between p-4 bg-[#F5F5F3] border border-[#DEDEDE] hover:border-[#0A0A0A] transition-colors cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-bold text-[#080808] block uppercase">Email Telemetry Alerts</span>
                <span className="text-[11px] text-[#777777] font-sans">
                  Receive application status transitions and confirmed interview invitations via email.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 accent-[#E42316] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#F5F5F3] border border-[#DEDEDE] hover:border-[#0A0A0A] transition-colors cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-bold text-[#080808] block uppercase">In-App Agent Notifications</span>
                <span className="text-[11px] text-[#777777] font-sans">
                  Immediate alerts when Agent 1 surfaces high-compatibility opportunities.
                </span>
              </div>
              <input
                type="checkbox"
                checked={inAppNotifs}
                onChange={(e) => setInAppNotifs(e.target.checked)}
                className="w-4 h-4 accent-[#E42316] cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-6 border-t border-[#DEDEDE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#777777] uppercase">
              <Lock className="w-3.5 h-3.5 text-[#E42316]" />
              <span>Row-Level Security Active</span>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
