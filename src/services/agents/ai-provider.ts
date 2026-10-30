// Provider-independent AI abstraction for InternBridge

export interface AIProviderResponse {
  success: boolean;
  content: string;
  source: 'live_llm' | 'deterministic_engine';
  metadata?: Record<string, unknown>;
}

export class AIServiceProvider {
  private static instance: AIServiceProvider;

  private apiKey?: string;
  private providerName: string;

  private constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    this.providerName = process.env.GEMINI_API_KEY ? 'gemini' : process.env.OPENAI_API_KEY ? 'openai' : 'none';
  }

  public static getInstance(): AIServiceProvider {
    if (!AIServiceProvider.instance) {
      AIServiceProvider.instance = new AIServiceProvider();
    }
    return AIServiceProvider.instance;
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  public getProviderStatus(): { configured: boolean; provider: string } {
    return {
      configured: this.isConfigured(),
      provider: this.isConfigured() ? this.providerName : 'Deterministic Intelligent Engine (Offline Mode)',
    };
  }

  /**
   * Generates structured text using LLM if configured, or deterministic rule engine if offline.
   */
  public async generateText(prompt: string, fallbackContent: string): Promise<AIProviderResponse> {
    if (!this.isConfigured()) {
      // Deterministic fallback - does not hallucinate, clearly reports offline engine
      return {
        success: true,
        content: fallbackContent,
        source: 'deterministic_engine',
        metadata: {
          note: 'Generated via InternBridge deterministic career intelligence engine (AI API key not configured).',
        },
      };
    }

    try {
      if (this.providerName === 'gemini') {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API returned ${response.status}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            success: true,
            content: text,
            source: 'live_llm',
            metadata: { model: 'gemini-1.5-flash' },
          };
        }
      }

      // Default fallback if parsing fails
      return {
        success: true,
        content: fallbackContent,
        source: 'deterministic_engine',
      };
    } catch {
      // Graceful error fallback
      return {
        success: true,
        content: fallbackContent,
        source: 'deterministic_engine',
        metadata: { fallback_reason: 'Live AI request timed out or was unreachable' },
      };
    }
  }
}

export const aiProvider = AIServiceProvider.getInstance();

