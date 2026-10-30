import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      interview_id,
      application_id,
      technical_rating,
      communication_rating,
      problem_solving_rating,
      overall_rating,
      notes,
      recommendation,
    } = body;

    const current = db.getCurrentUser();

    if (!interview_id || !application_id) {
      return NextResponse.json({ error: 'interview_id and application_id are required' }, { status: 400 });
    }

    const feedback = db.recordInterviewFeedback({
      interview_id,
      application_id,
      evaluator_id: current.id,
      technical_rating: Number(technical_rating) || 3,
      communication_rating: Number(communication_rating) || 3,
      problem_solving_rating: Number(problem_solving_rating) || 3,
      overall_rating: Number(overall_rating) || 3,
      notes: notes || '',
      recommendation: recommendation || 'neutral',
    });

    return NextResponse.json({
      success: true,
      feedback,
      message: 'Interview evaluation scorecard recorded.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

