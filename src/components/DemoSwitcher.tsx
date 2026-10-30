'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DemoSwitcher() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setCurrentUser(data.user);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const switchUser = async (userId: string, targetPath?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/switch-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        if (targetPath) {
          router.push(targetPath);
        } else {
          router.refresh();
          window.location.reload();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const users = [
    {
      id: 's1000000-0000-0000-0000-000000000001',
      name: 'Priya Sharma',
      role: 'Student',
      detail: 'NIT 2026 • 8.85 GPA',
      targetPath: '/student/dashboard',
      icon: GraduationCap,
    },
    {
      id: 's2000000-0000-0000-0000-000000000002',
      name: 'Rohan Mehta',
      role: 'Student',
      detail: 'IIT 2026 • 9.10 GPA',
      targetPath: '/student/dashboard',
      icon: GraduationCap,
    },
    {
      id: 'r1000000-0000-0000-0000-000000000001',
      name: 'Alex Rivera',
      role: 'Recruiter',
      detail: 'CloudScale Technologies',
      targetPath: '/recruiter/dashboard',
      icon: Briefcase,
    },
    {
      id: 'r2000000-0000-0000-0000-000000000002',
      name: 'Marcus Vance',
      role: 'Recruiter',
      detail: 'Nova Health AI',
      targetPath: '/recruiter/dashboard',
      icon: Briefcase,
    },
  ];

  return (
    <div className="bg-[#0A0A0A] border-b border-[#222222] text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-white">
        <span className="flex h-1.5 w-1.5 rounded-full bg-[#E42316] animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#777777]">Persona:</span>
        <span className="text-white font-medium">
          <strong className="text-white font-bold">{currentUser?.full_name || 'Loading...'}</strong>{' '}
          <span className="text-[#E42316] font-mono text-[11px] uppercase">[{currentUser?.role || '...'}]</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[#777777] mr-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider">
          <ArrowRightLeft className="w-3 h-3 text-[#E42316]" /> Switch:
        </span>
        {users.map((u) => {
          const isActive = currentUser?.id === u.id;
          const Icon = u.icon;
          return (
            <button
              key={u.id}
              onClick={() => switchUser(u.id, u.targetPath)}
              disabled={loading || isActive}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E42316] text-white font-bold'
                  : 'bg-[#151515] text-[#DEDEDE] hover:bg-[#222222] hover:text-white border border-[#333333]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{u.name}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">({u.role})</span>
              {isActive && <CheckCircle2 className="w-3 h-3 text-white ml-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
