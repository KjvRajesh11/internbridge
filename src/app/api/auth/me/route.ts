import { NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function GET() {
  const user = db.getCurrentUser();
  const company = user.role === 'recruiter' ? db.getCompanyByRecruiter(user.id) : null;
  const preferences = user.role === 'student' ? db.getStudentPreferences(user.id) : null;

  return NextResponse.json({
    user,
    company,
    preferences,
    availableProfiles: Array.from(db.profiles.values()).map((p) => ({
      id: p.id,
      name: p.full_name,
      role: p.role,
      email: p.email,
    })),
  });
}

