import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const studentId = searchParams.get('studentId') || undefined;
  const internshipId = searchParams.get('internshipId') || undefined;
  const companyId = searchParams.get('companyId') || undefined;

  const applications = db.getApplications({ studentId, internshipId, companyId });

  return NextResponse.json({
    applications,
    total: applications.length,
  });
}

