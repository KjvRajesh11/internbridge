import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/storage/db';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const profile = db.getProfile(userId);
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    db.setCurrentUser(userId);

    return NextResponse.json({
      success: true,
      user: profile,
      message: `Switched active session to ${profile.full_name} (${profile.role})`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

