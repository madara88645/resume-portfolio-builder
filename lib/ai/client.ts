import OpenAI from "openai";

let client: OpenAI | null = null;

function readEnvKey(key: string): string | undefined {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.[key];
}

export function isOpenAIConfigured(): boolean {
  return Boolean(readEnvKey("OPENAI_API_KEY"));
}

export function getOpenAIClient(): OpenAI {
  const apiKey = readEnvKey("OPENAI_API_KEY");
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required for AI generation.");
  }

  if (!client) {
    client = new OpenAI({ apiKey });
  }

  return client;
}
