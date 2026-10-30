import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      application_id,
      interviewer_id,
      start_time,
      end_time,
      timezone,
      interview_mode,
      meeting_url,
      candidate_instructions,
      slot_id,
    } = body;

    const current = db.getCurrentUser();
    const interviewer = interviewer_id || current.id;

    if (!application_id || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'application_id, start_time, and end_time are required.' },
        { status: 400 }
      );
    }

    const interview = db.scheduleInterview({
      application_id,
      interviewer_id: interviewer,
      start_time,
      end_time,
      timezone: timezone || 'Asia/Kolkata',
      interview_mode: interview_mode || 'video',
      meeting_url,
      candidate_instructions,
      slot_id,
    });

    return NextResponse.json({
      success: true,
      interview,
      message: 'Interview successfully scheduled and notified to the student.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

