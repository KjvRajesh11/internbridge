import { NextRequest, NextResponse } from 'next/server';
import { careerOpsAgent } from '@/services/agents/career-ops-agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, studentAnswer } = body;

    if (!question || !studentAnswer) {
      return NextResponse.json(
        { error: 'Both question and studentAnswer are required.' },
        { status: 400 }
      );
    }

    const evaluation = await careerOpsAgent.evaluateMockAnswer({
      question,
      studentAnswer,
    });

    return NextResponse.json({
      success: true,
      evaluation,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

