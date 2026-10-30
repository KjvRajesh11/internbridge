import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';
import { executionAgent } from '@/services/agents/execution-agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const current = db.getCurrentUser();
    const studentId = body.studentId || current.id;

    const result = await executionAgent.runAutoApplyCycle(studentId);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

