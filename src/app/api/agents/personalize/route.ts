import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';
import { personalizationAgent } from '@/services/agents/personalization-agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = db.getCurrentUser();
    const studentId = body.studentId || current.id;
    const { internshipId } = body;

    if (!internshipId) {
      return NextResponse.json({ error: 'internshipId is required' }, { status: 400 });
    }

    const result = await personalizationAgent.generateApplicationMaterials({
      studentId,
      internshipId,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

