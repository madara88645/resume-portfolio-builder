import { NextRequest, NextResponse } from "next/server";
import { ResumeSchema } from "@/lib/ai/schema";
import { PROMPT_REFERENCES, generateMockPortfolio } from "@/lib/ai/mock";
import { isOpenAIConfigured } from "@/lib/ai/client";
import { generateAIPortfolio } from "@/lib/ai/generate";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const parsed = ResumeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const jobId = crypto.randomUUID();
  const rawText = JSON.stringify(parsed.data);
  const useRealAI = isOpenAIConfigured();
  const result = useRealAI
    ? await generateAIPortfolio({ rawText, jobId })
    : await generateMockPortfolio({ rawText, jobId });

  return NextResponse.json({
    summary: result.summary,
    html: result.html,
    structuredData: result.structuredData,
    prompts: PROMPT_REFERENCES,
  });
}
