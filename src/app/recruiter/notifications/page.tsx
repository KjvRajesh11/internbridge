'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/storage/db';
import { NotificationItem } from '@/types';
import { Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RecruiterNotificationsPage() {
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
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#DEDEDE]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest bg-[#0A0A0A] text-white mb-3">
            <Bell className="w-3 h-3 text-[#E42316]" />
            Pipeline Alerts &amp; Events
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Recruiter Notification Center
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mt-2">
            Real-time notifications for candidate submissions, slot confirmations, and status transitions.
          </p>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="border border-[#DEDEDE] bg-[#F5F5F3] p-12 text-center text-xs font-mono uppercase tracking-wider text-[#777777]">
              No notifications recorded.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-5 border transition-colors flex items-start justify-between gap-4 cursor-pointer ${
                  n.read
                    ? 'bg-[#FFFFFF] border-[#DEDEDE] text-[#777777]'
                    : 'bg-[#F5F5F3] border-[#080808] text-[#080808]'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {!n.read && <span className="h-2 w-2 bg-[#E42316] shrink-0" />}
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[#080808]">{n.title}</h3>
                  </div>
                  <p className="text-xs font-mono text-[#080808] leading-relaxed">{n.message}</p>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block pt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>

                {n.link && (
                  <Link
                    href={n.link}
                    className="px-3 py-1.5 bg-[#0A0A0A] hover:bg-[#E42316] text-white text-[11px] font-mono uppercase tracking-wider font-bold shrink-0 flex items-center gap-1 transition-colors"
                  >
                    View <ArrowRight className="w-3 h-3" />
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
