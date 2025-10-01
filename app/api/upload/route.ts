import { NextRequest, NextResponse } from "next/server";
import { generateMockPortfolio } from "@/lib/ai/mock";
import { isOpenAIConfigured } from "@/lib/ai/client";
import { generateAIPortfolio } from "@/lib/ai/generate";
import { createJob, getJob, setJobError, setJobResult } from "@/lib/data/jobs";
import { extractTextFromFile, extractTextFromLinkedIn } from "@/lib/parsing/extractor";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const fileEntry = formData.get("file");
  const linkedInUrl = formData.get("linkedInUrl")?.toString().trim();

  if (!fileEntry && !linkedInUrl) {
    return NextResponse.json({ error: "Provide a CV file or LinkedIn URL" }, { status: 400 });
  }

  const job = createJob();

  try {
    let rawText = "";

    if (fileEntry instanceof File) {
      rawText = await extractTextFromFile(fileEntry);
    } else if (linkedInUrl) {
      rawText = await extractTextFromLinkedIn(linkedInUrl);
    } else {
      throw new Error("Unsupported upload payload");
    }

    const useRealAI = isOpenAIConfigured();
    const result = useRealAI
      ? await executeWithFallback(() => generateAIPortfolio({ rawText, jobId: job.id }), () =>
          generateMockPortfolio({ rawText, jobId: job.id })
        )
      : await generateMockPortfolio({ rawText, jobId: job.id });
    setJobResult(job.id, result);

    if (!useRealAI) {
      console.info("OPENAI_API_KEY missing. Returned mock portfolio for job", job.id);
    }

    return NextResponse.json({ jobId: job.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    setJobError(job.id, message);
    return NextResponse.json({ jobId: job.id, error: message }, { status: 500 });
  }
}

async function executeWithFallback<T>(primary: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await primary();
  } catch (error) {
    console.error("Primary AI generation failed, falling back to mock", error);
    return fallback();
  }
}

export async function GET(request: NextRequest) {
  const jobId = request.nextUrl.searchParams.get("jobId");
  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 });
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json({ status: "error", error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ status: job.status, result: job.result ?? null, error: job.error ?? null });
}
