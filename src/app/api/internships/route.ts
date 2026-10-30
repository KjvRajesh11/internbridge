import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;
  const workMode = searchParams.get('workMode') || undefined;
  const companyId = searchParams.get('companyId') || undefined;

  const internships = db.getInternships({ status, search, workMode, companyId });

  return NextResponse.json({
    internships,
    total: internships.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = db.getCurrentUser();

    // Verify company for recruiter
    const company = db.getCompanyByRecruiter(current.id);
    const companyId = body.company_id || company?.id;

    if (!companyId) {
      return NextResponse.json(
        { error: 'Recruiter must belong to a registered company to publish internships.' },
        { status: 400 }
      );
    }

    const newInternship = db.createInternship({
      company_id: companyId,
      created_by: current.id,
      title: body.title,
      description: body.description,
      responsibilities: body.responsibilities || '',
      required_skills: body.required_skills || [],
      preferred_skills: body.preferred_skills || [],
      eligibility_rules: body.eligibility_rules || {},
      minimum_gpa: Number(body.minimum_gpa) || 0,
      accepted_graduation_years: body.accepted_graduation_years || [],
      location: body.location || 'Remote',
      work_mode: body.work_mode || 'remote',
      duration: body.duration || '3 Months',
      stipend: body.stipend || 'Competitive',
      application_deadline: body.application_deadline || new Date(Date.now() + 30 * 86400000).toISOString(),
      status: body.status || 'published',
      openings_count: Number(body.openings_count) || 1,
    });

    return NextResponse.json({
      success: true,
      internship: newInternship,
      message: 'Internship published successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

