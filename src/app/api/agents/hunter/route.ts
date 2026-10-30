import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';
import { hunterAgent } from '@/services/agents/hunter-agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const current = db.getCurrentUser();
    const studentId = body.studentId || current.id;

    const recommendations = await hunterAgent.discoverOpportunities(studentId);

    return NextResponse.json({
      success: true,
      recommendations,
      count: recommendations.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

