import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';
import { careerOpsAgent } from '@/services/agents/career-ops-agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = db.getCurrentUser();
    const studentId = body.studentId || current.id;
    const { internshipId } = body;

    if (!internshipId) {
      return NextResponse.json({ error: 'internshipId is required' }, { status: 400 });
    }

    const prepSheet = await careerOpsAgent.generateInterviewPrepSheet({
      studentId,
      internshipId,
    });

    return NextResponse.json({
      success: true,
      prepSheet,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

