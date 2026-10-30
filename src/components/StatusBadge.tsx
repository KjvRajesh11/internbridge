import React from 'react';
import { ApplicationStatus } from '@/types';

interface StatusBadgeProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const map: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
    applied: {
      label: 'Applied',
      bg: 'bg-[#F4F4F2]',
      text: 'text-[#0A0A0A]',
      border: 'border-[#DEDEDE]',
      dot: 'bg-[#777777]',
    },
    under_review: {
      label: 'Under Review',
      bg: 'bg-[#151515]',
      text: 'text-white',
      border: 'border-[#333333]',
      dot: 'bg-[#E42316]',
    },
    shortlisted: {
      label: 'Shortlisted',
      bg: 'bg-white',
      text: 'text-[#E42316]',
      border: 'border-[#E42316]',
      dot: 'bg-[#E42316]',
    },
    interview_scheduled: {
      label: 'Interview Scheduled',
      bg: 'bg-[#0A0A0A]',
      text: 'text-white',
      border: 'border-[#0A0A0A]',
      dot: 'bg-[#E42316]',
    },
    selected: {
      label: 'Selected',
      bg: 'bg-[#E42316]',
      text: 'text-white',
      border: 'border-[#E42316]',
      dot: 'bg-white',
    },
    rejected: {
      label: 'Rejected',
      bg: 'bg-[#F4F4F2]',
      text: 'text-[#777777]',
      border: 'border-[#DEDEDE]',
      dot: 'bg-[#777777]',
    },
    withdrawn: {
      label: 'Withdrawn',
      bg: 'bg-[#F4F4F2]',
      text: 'text-[#777777]',
      border: 'border-[#DEDEDE]',
      dot: 'bg-[#777777]',
    },
    published: {
      label: 'Published',
      bg: 'bg-[#0A0A0A]',
      text: 'text-white',
      border: 'border-[#0A0A0A]',
      dot: 'bg-[#E42316]',
    },
    draft: {
      label: 'Draft',
      bg: 'bg-[#F4F4F2]',
      text: 'text-[#777777]',
      border: 'border-[#DEDEDE]',
      dot: 'bg-[#777777]',
    },
    remote: {
      label: 'Remote',
      bg: 'bg-[#F4F4F2]',
      text: 'text-[#0A0A0A]',
      border: 'border-[#DEDEDE]',
      dot: 'bg-[#E42316]',
    },
    hybrid: {
      label: 'Hybrid',
      bg: 'bg-[#F4F4F2]',
      text: 'text-[#0A0A0A]',
      border: 'border-[#DEDEDE]',
      dot: 'bg-[#777777]',
    },
    'in-office': {
      label: 'In-Office',
      bg: 'bg-[#F4F4F2]',
      text: 'text-[#0A0A0A]',
      border: 'border-[#DEDEDE]',
      dot: 'bg-[#777777]',
    },
  };

  const current = map[status] || {
    label: status,
    bg: 'bg-[#F4F4F2]',
    text: 'text-[#0A0A0A]',
    border: 'border-[#DEDEDE]',
    dot: 'bg-[#777777]',
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px] tracking-wide uppercase' : 'px-2.5 py-1 text-xs tracking-wider uppercase font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 border font-mono ${current.border} ${current.bg} ${current.text} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  );
}
