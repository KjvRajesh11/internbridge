import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const recruiterId = searchParams.get('recruiterId') || undefined;
  const companyId = searchParams.get('companyId') || undefined;
  const unbookedOnly = searchParams.get('unbookedOnly') === 'true';

  const slots = db.getInterviewSlots({ recruiterId, companyId, unbookedOnly });
  return NextResponse.json({ slots });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = db.getCurrentUser();
    const company = db.getCompanyByRecruiter(current.id);

    if (!company) {
      return NextResponse.json({ error: 'Recruiter must belong to a company to create slots.' }, { status: 400 });
    }

    const slot = db.createInterviewSlot({
      recruiter_id: current.id,
      company_id: company.id,
      start_time: body.start_time,
      end_time: body.end_time,
      timezone: body.timezone || 'Asia/Kolkata',
    });

    return NextResponse.json({ success: true, slot });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

