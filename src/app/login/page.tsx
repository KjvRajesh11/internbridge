'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  ArrowRight,
  GraduationCap,
  Briefcase,
  AlertCircle,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemoLogin = async (userId: string, targetPath: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/switch-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(targetPath);
      } else {
        setError(data.error || 'Failed to switch demo persona');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('recruiter') || email.includes('cloudscale')) {
      handleDemoLogin('r1000000-0000-0000-0000-000000000001', '/recruiter/dashboard');
    } else {
      handleDemoLogin('s1000000-0000-0000-0000-000000000001', '/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-16 px-4 border-t border-[#DEDEDE]">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white">
            <span className="w-1.5 h-1.5 bg-[#E42316]" />
            Session Authentication
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Sign In to InternBridge
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            Access candidate operations or recruiter recruitment workspace
          </p>
        </div>

        {/* 1-Click Evaluation Demo Personas */}
        <div className="border border-[#080808] bg-[#0A0A0A] text-white p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#303030] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E42316]" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                1-Click Demo Evaluation Sign-In
              </span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-[#A0A0A0] leading-relaxed">
            Select an initialized demo persona to immediately test all workflows without manual credential entry:
          </p>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => handleDemoLogin('s1000000-0000-0000-0000-000000000001', '/student/dashboard')}
              disabled={loading}
              className="w-full flex items-center justify-between p-3.5 bg-[#151515] hover:bg-[#202020] border border-[#303030] hover:border-[#E42316] transition-colors text-left text-xs cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#080808] border border-[#404040] text-[#E42316] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wide text-white block group-hover:text-[#E42316] transition-colors">
                    Priya Sharma (Student)
                  </span>
                  <span className="text-[10px] font-mono text-[#A0A0A0]">
                    NIT B.Tech • 8.85 GPA • Full Stack Engineer
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#777777] group-hover:text-white transition-colors" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('r1000000-0000-0000-0000-000000000001', '/recruiter/dashboard')}
              disabled={loading}
              className="w-full flex items-center justify-between p-3.5 bg-[#151515] hover:bg-[#202020] border border-[#303030] hover:border-[#E42316] transition-colors text-left text-xs cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#080808] border border-[#404040] text-[#E42316] flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wide text-white block group-hover:text-[#E42316] transition-colors">
                    Alex Rivera (Recruiter)
                  </span>
                  <span className="text-[10px] font-mono text-[#A0A0A0]">
                    CloudScale Technologies • Technical Lead Recruiter
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#777777] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {error && (
          <div className="border border-[#E42316] bg-[#FFFFFF] text-[#080808] p-3 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E42316]" />
            <span>{error}</span>
          </div>
        )}

        {/* Manual Login Form */}
        <form onSubmit={handleSubmit} className="border border-[#DEDEDE] bg-[#FFFFFF] p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya.sharma@example.edu"
                className="w-full bg-white border border-[#DEDEDE] pl-9 pr-3 py-2 text-xs font-mono text-[#080808] placeholder:text-[#777777] focus:border-[#E42316] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#080808] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#DEDEDE] pl-9 pr-3 py-2 text-xs font-mono text-[#080808] placeholder:text-[#777777] focus:border-[#E42316] focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E42316] hover:bg-[#0A0A0A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs font-mono uppercase tracking-wider text-[#777777] space-y-2">
          <p>New to InternBridge?</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/register/student" className="text-[#080808] hover:text-[#E42316] underline">
              Student Registration
            </Link>
            <span>•</span>
            <Link href="/register/recruiter" className="text-[#080808] hover:text-[#E42316] underline">
              Recruiter Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
