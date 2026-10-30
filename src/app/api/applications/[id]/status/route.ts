import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';
import { ApplicationStatus } from '@/types';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status, reason } = body;

    const validStatuses: ApplicationStatus[] = [
      'applied',
      'under_review',
      'shortlisted',
      'interview_scheduled',
      'selected',
      'rejected',
      'withdrawn',
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const current = db.getCurrentUser();
    const updated = db.updateApplicationStatus(id, status, current.id, reason);

    return NextResponse.json({
      success: true,
      application: updated,
      message: `Application status transitioned to ${status}.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

