import { NextResponse } from 'next/server';
import { agentOrchestrator } from '@/services/agents/agent-orchestrator';
import { db } from '@/lib/storage/db';

export async function GET() {
  const current = db.getCurrentUser();
  const status = agentOrchestrator.getSystemStatus();
  const recentRuns = agentOrchestrator.getRecentAgentRuns(current.id);

  return NextResponse.json({
    ...status,
    recentRuns,
  });
}

