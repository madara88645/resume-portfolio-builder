import { getOpenAIClient } from "@/lib/ai/client";
import { DATA_PARSING_PROMPT, PORTFOLIO_PROMPT, SUMMARY_PROMPT } from "@/lib/ai/prompts";
import { ResumePayload, ResumeSchema } from "@/lib/ai/schema";
import { GenerationResult } from "@/lib/ai/types";
import { storeHtmlAsset } from "@/lib/storage/storage";
import type OpenAI from "openai";

const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const PARSER_MODEL = process.env.OPENAI_PARSER_MODEL ?? DEFAULT_MODEL;
const SUMMARY_MODEL = process.env.OPENAI_SUMMARY_MODEL ?? DEFAULT_MODEL;
const PORTFOLIO_MODEL = process.env.OPENAI_PORTFOLIO_MODEL ?? "gpt-4o-mini";

const RESUME_JSON_TEMPLATE = `{
  "experience": [
    {
      "company": "string",
      "title": "string",
      "startDate": "string optional",
      "endDate": "string optional",
      "responsibilities": ["string"],
      "location": "string optional"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "startDate": "string optional",
      "endDate": "string optional"
    }
  ],
  "skills": ["string"],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "link": "https:// optional",
      "technologies": ["string"]
    }
  ],
  "contact": {
    "fullName": "string optional",
    "email": "valid email optional",
    "phone": "string optional",
    "location": "string optional",
    "website": "https:// optional",
    "social": [ { "label": "string", "url": "https://" } ]
  }
}`;

type GenerationInput = {
  rawText: string;
  jobId: string;
};

export async function generateAIPortfolio({ rawText, jobId }: GenerationInput): Promise<GenerationResult> {
  const client = getOpenAIClient();

  const structuredData = await parseResume(client, rawText);
  const summary = await writeSummary(client, structuredData);
  const html = await renderPortfolio(client, structuredData, summary);
  const storedAsset = await storeHtmlAsset(jobId, html);

  return {
    jobId,
    summary,
    structuredData,
    html,
    shareSlug: storedAsset.slug,
    downloadUrl: storedAsset.downloadUrl,
  };
}

async function parseResume(client: OpenAI, rawText: string): Promise<ResumePayload> {
  const systemPrompt = `${DATA_PARSING_PROMPT} Return a JSON object matching the following shape: ${RESUME_JSON_TEMPLATE}. All arrays must be present, even if empty. Do not include commentary.`;

  const completion = await client.chat.completions.create({
    model: PARSER_MODEL,
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: rawText.slice(0, 12000),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("AI parser returned an empty response");
  }

  const parsedJson = parseJsonContent(content);
  return ResumeSchema.parse(parsedJson);
}

async function writeSummary(client: OpenAI, resume: ResumePayload): Promise<string> {
  const completion = await client.chat.completions.create({
    model: SUMMARY_MODEL,
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: `${SUMMARY_PROMPT} The tone should be confident, concise, and tailored for hiring managers. Return plain text only.`,
      },
      {
        role: "user",
        content: JSON.stringify(resume),
      },
    ],
  });

  const summary = completion.choices[0]?.message?.content?.trim();
  if (!summary) {
    throw new Error("AI summary generation returned an empty response");
  }

  return stripCodeFences(summary);
}

async function renderPortfolio(client: OpenAI, resume: ResumePayload, summary: string): Promise<string> {
  const userPayload = JSON.stringify({ summary, resume });

  const completion = await client.chat.completions.create({
    model: PORTFOLIO_MODEL,
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: `${PORTFOLIO_PROMPT} Return a complete <!DOCTYPE html> document with inline <style> tags only. Do not include markdown or triple backticks. Ensure the summary and resume data are fully reflected.`,
      },
      {
        role: "user",
        content: userPayload,
      },
    ],
  });

  const html = completion.choices[0]?.message?.content;
  if (!html) {
    throw new Error("AI portfolio renderer returned an empty response");
  }

  return normaliseHtml(html);
}

function parseJsonContent(content: string) {
  const trimmed = stripCodeFences(content).trim();
  return JSON.parse(trimmed);
}

function stripCodeFences(value: string) {
  const match = value.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (match) {
    return match[1];
  }
  return value;
}

function normaliseHtml(content: string): string {
  const trimmed = stripCodeFences(content).trim();
  if (trimmed.toLowerCase().startsWith("<!doctype html")) {
    return trimmed;
  }
  if (trimmed.toLowerCase().startsWith("<html")) {
    return `<!DOCTYPE html>\n${trimmed}`;
  }
  return `<!DOCTYPE html>\n<html lang="en">\n${trimmed}\n</html>`;
}
