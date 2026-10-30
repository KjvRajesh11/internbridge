'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { NotificationItem } from '@/types';
import { Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setNotifications(db.getNotifications(data.user.id));
        }
      });
  }, []);

  const markAsRead = (id: string) => {
    db.markNotificationAsRead(id);
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b-2 border-[#0A0A0A] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E42316] font-bold">
            <span className="w-2 h-2 bg-[#E42316]" />
            <span>EVENT STREAM &amp; TELEMETRY ALERTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#080808] uppercase tracking-tight mt-2">
            NOTIFICATION CENTER
          </h1>
          <p className="font-mono text-xs text-[#777777] uppercase tracking-wider mt-1">
            Real-time status transitions, interview invitations, and agent execution updates.
          </p>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="border-2 border-dashed border-[#DEDEDE] p-16 text-center font-mono text-xs text-[#777777] uppercase">
              No notifications on record. New events and alerts will stream here.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-6 border transition-colors flex items-start justify-between gap-4 cursor-pointer ${
                  n.read
                    ? 'bg-[#F5F5F3] border-[#DEDEDE] text-[#777777]'
                    : 'bg-white border-[#0A0A0A] text-[#080808]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {!n.read && <span className="h-2 w-2 rounded-full bg-[#E42316] shrink-0" />}
                    <h3 className="font-mono text-sm font-bold uppercase tracking-tight">{n.title}</h3>
                  </div>
                  <p className="text-xs font-sans text-[#777777] leading-relaxed">{n.message}</p>
                  <span className="font-mono text-[10px] text-[#777777] block pt-1 uppercase">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>

                {n.link && (
                  <Link
                    href={n.link}
                    className="px-3.5 py-1.5 border border-[#0A0A0A] bg-white hover:bg-[#0A0A0A] hover:text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 transition-colors"
                  >
                    View <ArrowRight className="w-3.5 h-3.5 text-[#E42316]" />
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
