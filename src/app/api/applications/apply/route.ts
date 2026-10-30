import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';
import { executionAgent } from '@/services/agents/execution-agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, internshipId, coverLetter, answers, mode } = body;

    const current = db.getCurrentUser();
    const effectiveStudentId = studentId || current.id;

    if (!effectiveStudentId || !internshipId) {
      return NextResponse.json(
        { error: 'Missing mandatory fields: studentId and internshipId are required.' },
        { status: 400 }
      );
    }

    const result = await executionAgent.submitApplication({
      studentId: effectiveStudentId,
      internshipId,
      mode: mode === 'autonomous_auto_apply' ? 'autonomous_auto_apply' : 'assisted',
      coverLetter,
      answers,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.message,
          reasons: result.reasons,
          duplicate: result.reasons?.some((r) => r.toLowerCase().includes('already applied')),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      applicationId: result.applicationId,
      application: result.application,
      message: result.message,
    });
  } catch (err: any) {
    if (err.code === 'DUPLICATE_APPLICATION') {
      return NextResponse.json(
        {
          error: 'A student cannot apply to the same internship more than once.',
          duplicate: true,
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

