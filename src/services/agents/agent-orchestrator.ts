import { db } from '@/lib/storage/db';
import { hunterAgent } from '@/services/agents/hunter-agent';
import { personalizationAgent } from '@/services/agents/personalization-agent';
import { executionAgent } from '@/services/agents/execution-agent';
import { guardAgent } from '@/services/agents/guard-agent';
import { careerOpsAgent } from '@/services/agents/career-ops-agent';
import { aiProvider } from '@/services/agents/ai-provider';
import { AgentRun } from '@/types';

export class AgentOrchestrator {
  public hunter = hunterAgent;
  public personalization = personalizationAgent;
  public execution = executionAgent;
  public guard = guardAgent;
  public careerOps = careerOpsAgent;

  public getSystemStatus() {
    const aiStatus = aiProvider.getProviderStatus();
    return {
      activeAgents: [
        {
          id: 'hunter_agent',
          name: 'Agent 1: Autonomous Internship Hunter',
          status: 'online',
          description: 'Weighted opportunity matching, skill gap discovery, and preference alignment.',
        },
        {
          id: 'personalization_agent',
          name: 'Agent 2: AI Resume & Cover Letter Personalization',
          status: 'online',
          description: 'Truthful tailored cover letters, bullet improvements, and screening answers.',
        },
        {
          id: 'execution_agent',
          name: 'Agent 3: Autonomous Application Execution',
          status: 'online',
          description: 'Reliable assisted and pre-authorized internal application submission.',
        },
        {
          id: 'guard_agent',
          name: 'Agent 4: Eligibility & Integrity Guard',
          status: 'online',
          description: 'Deterministic enforcement of deadlines, GPA, and duplicate prevention.',
        },
        {
          id: 'career_ops_agent',
          name: 'Agent 5: Career Operations & Interview Preparation',
          status: 'online',
          description: 'Stage dwell analysis, follow-up generation, and technical interview rehearsal.',
        },
      ],
      aiProvider: aiStatus,
    };
  }

  public getRecentAgentRuns(userId: string): AgentRun[] {
    return db.getAgentRuns(userId);
  }
}

export const agentOrchestrator = new AgentOrchestrator();

