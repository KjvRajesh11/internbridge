'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  Compass,
  FileCheck,
  Zap,
  Shield,
  TrendingUp,
  Play,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Sliders,
  History,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { AgentRun } from '@/types';

export default function AgentWorkspacePage() {
  const [agentsStatus, setAgentsStatus] = useState<any>(null);
  const [recentRuns, setRecentRuns] = useState<AgentRun[]>([]);
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(true);
  const [matchThreshold, setMatchThreshold] = useState(80);
  const [maxWeeklyApps, setMaxWeeklyApps] = useState(5);
  const [isRunningHunter, setIsRunningHunter] = useState(false);
  const [isRunningAutoApply, setIsRunningAutoApply] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = () => {
    fetch('/api/agents/status')
      .then((res) => res.json())
      .then((data) => {
        setAgentsStatus(data);
        if (data.recentRuns) setRecentRuns(data.recentRuns);
      })
      .catch(() => {});
  };

  const handleRunHunter = async () => {
    setIsRunningHunter(true);
    setMessage(null);
    try {
      const res = await fetch('/api/agents/hunter', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Agent 1 Hunter completed: Discovered ${data.count} matching opportunities.`);
        loadStatus();
      }
    } finally {
      setIsRunningHunter(false);
    }
  };

  const handleRunAutoApply = async () => {
    setIsRunningAutoApply(true);
    setMessage(null);
    try {
      const res = await fetch('/api/agents/auto-apply', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setMessage(
          `Agent 3 Execution Cycle complete: Processed ${data.result.processed} listings. Submitted: ${data.result.submitted}. Skipped: ${data.result.skipped}.`
        );
        loadStatus();
      }
    } finally {
      setIsRunningAutoApply(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b-2 border-[#0A0A0A] pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
              <span className="w-2 h-2 bg-[#E42316]" />
              <span>CENTRAL AGENT ORCHESTRATOR</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
              AI CAREER AGENT HUB
            </h1>
            <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
              Manage the 5 autonomous services: Hunter, Personalizer, Executor, Guard, and Career Ops.
            </p>
          </div>

          {/* Inference Status */}
          <div className="border border-[#DEDEDE] bg-[#F5F5F3] px-4 py-2.5 flex items-center gap-3 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E42316] animate-pulse" />
            <div>
              <span className="text-[10px] text-[#777777] block uppercase font-bold tracking-wider">Inference Engine</span>
              <span className="text-[#080808] font-bold">
                {agentsStatus?.aiProvider?.provider || 'Deterministic Intelligence Engine'}
              </span>
            </div>
          </div>
        </div>

        {message && (
          <div className="border-l-4 border-[#0A0A0A] bg-[#F5F5F3] text-[#080808] p-4 text-xs font-mono flex items-center gap-3">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span className="font-bold">{message}</span>
          </div>
        )}

        {/* Manual Agent Trigger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trigger Agent 1: Hunter */}
          <div className="border border-[#DEDEDE] bg-white p-6 space-y-4 hover:border-[#0A0A0A] transition-colors">
            <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold">
                  01
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#E42316] uppercase tracking-wider">Autonomous Matcher</span>
                  <h3 className="text-base font-black text-[#080808] uppercase tracking-tight">Hunter Scan Cycle</h3>
                </div>
              </div>
              <button
                onClick={handleRunHunter}
                disabled={isRunningHunter}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#E42316] hover:bg-[#0A0A0A] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                {isRunningHunter ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Scanning...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Trigger Scan
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-[#777777] leading-relaxed">
              Calculates multi-factor deterministic compatibility (Skills 40%, Preferred 20%, Roles 15%, Academic 10%, Location 10%) across active database listings.
            </p>
          </div>

          {/* Trigger Agent 3: Execution Sweep */}
          <div className="border border-[#DEDEDE] bg-white p-6 space-y-4 hover:border-[#0A0A0A] transition-colors">
            <div className="flex items-center justify-between border-b border-[#DEDEDE] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-xs font-bold">
                  03
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#E42316] uppercase tracking-wider">Execution Pipeline</span>
                  <h3 className="text-base font-black text-[#080808] uppercase tracking-tight">Run Auto-Apply Sweep</h3>
                </div>
              </div>
              <button
                onClick={handleRunAutoApply}
                disabled={isRunningAutoApply}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0A0A0A] hover:bg-[#E42316] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                {isRunningAutoApply ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" /> Executing...
                  </>
                ) : (
                  <>
                    <RotateCw className="w-3.5 h-3.5" /> Run Sweep
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-[#777777] leading-relaxed">
              Evaluates unapplied listings with Agent 4 Integrity Guard. Submits authorized applications only if match score exceeds cutoff and duplicate checks pass.
            </p>
          </div>
        </div>

        {/* Auto-Apply Preferences Configuration */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DEDEDE]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E42316]" />
              <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Auto-Apply Preferences &amp; Controls</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
              <span className="font-bold text-[#080808] uppercase">Enable Auto-Apply:</span>
              <input
                type="checkbox"
                checked={autoApplyEnabled}
                onChange={(e) => setAutoApplyEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#E42316] cursor-pointer"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-[#080808] uppercase">Match Cutoff Threshold</span>
                <span className="font-bold text-[#E42316]">{matchThreshold}% or higher</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                value={matchThreshold}
                onChange={(e) => setMatchThreshold(Number(e.target.value))}
                className="w-full accent-[#E42316] cursor-pointer"
              />
              <p className="text-[11px] text-[#777777] mt-1 font-sans">
                Positions falling below this compatibility score will never be submitted automatically.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-[#080808] uppercase">Weekly Dispatch Cap</span>
                <span className="font-bold text-[#E42316]">{maxWeeklyApps} applications</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={maxWeeklyApps}
                onChange={(e) => setMaxWeeklyApps(Number(e.target.value))}
                className="w-full accent-[#E42316] cursor-pointer"
              />
              <p className="text-[11px] text-[#777777] mt-1 font-sans">
                Deterministic ceiling to prevent application spam and preserve candidate deliberate intent.
              </p>
            </div>
          </div>
        </div>

        {/* Agent Run Audit History */}
        <div className="border border-[#DEDEDE] bg-white p-6 sm:p-8 space-y-4">
          <div className="border-b border-[#DEDEDE] pb-3">
            <h2 className="text-base font-black text-[#080808] uppercase tracking-tight">Agent Execution Audit Log</h2>
            <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-0.5">
              Immutable telemetry capturing every automated agent workflow and decision.
            </p>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#0A0A0A] bg-[#F5F5F3] text-[#080808] font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Agent</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Trigger</th>
                  <th className="py-3 px-4">Output Summary</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDEDE] text-[#080808]">
                {recentRuns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-[#777777]">
                      No recorded agent runs yet. Trigger a scan above to populate telemetry.
                    </td>
                  </tr>
                ) : (
                  recentRuns.map((run) => (
                    <tr key={run.id} className="hover:bg-[#F5F5F3]">
                      <td className="py-3 px-4 font-bold text-[#080808]">
                        {run.agent_type.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase ${
                            run.status === 'completed'
                              ? 'bg-[#0A0A0A] text-white'
                              : 'bg-[#E42316] text-white'
                          }`}
                        >
                          {run.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 uppercase text-[#777777]">{run.trigger_type}</td>
                      <td className="py-3 px-4 text-[11px] text-[#777777] max-w-xs truncate">
                        {JSON.stringify(run.output_summary)}
                      </td>
                      <td className="py-3 px-4 text-right text-[#777777]">
                        {new Date(run.started_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
