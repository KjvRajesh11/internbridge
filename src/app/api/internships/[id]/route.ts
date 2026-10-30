import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const internship = db.getInternship(id);

  if (!internship) {
    return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
  }

  const current = db.getCurrentUser();
  const hasApplied = current.role === 'student' ? db.hasApplied(current.id, id) : false;

  return NextResponse.json({
    internship,
    hasApplied,
  });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = db.updateInternship(id, body);
    return NextResponse.json({
      success: true,
      internship: updated,
      message: 'Internship updated successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

