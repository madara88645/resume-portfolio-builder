import { GenerationJobStatus, GenerationResult } from "@/lib/ai/types";

type JobRecord = {
  id: string;
  status: GenerationJobStatus;
  result?: GenerationResult;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
};

const jobs = new Map<string, JobRecord>();

export function createJob(): JobRecord {
  const id = crypto.randomUUID();
  const now = new Date();
  const record: JobRecord = {
    id,
    status: "processing",
    createdAt: now,
    updatedAt: now,
  };
  jobs.set(id, record);
  return record;
}

export function setJobResult(id: string, result: GenerationResult) {
  const record = jobs.get(id);
  if (!record) {
    throw new Error(`Job ${id} not found`);
  }
  record.status = "ready";
  record.result = result;
  record.updatedAt = new Date();
  jobs.set(id, record);
}

export function setJobError(id: string, message: string) {
  const record = jobs.get(id);
  if (!record) {
    throw new Error(`Job ${id} not found`);
  }
  record.status = "error";
  record.error = message;
  record.updatedAt = new Date();
  jobs.set(id, record);
}

export function getJob(id: string): JobRecord | null {
  return jobs.get(id) ?? null;
}
