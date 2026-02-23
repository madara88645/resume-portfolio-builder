import { createJob, setJobResult, setJobError, getJob } from "@/lib/data/jobs";
import type { GenerationResult } from "@/lib/ai/types";

const mockResult: GenerationResult = {
  jobId: "test-job-id",
  summary: "Experienced engineer.",
  structuredData: {
    experience: [],
    education: [],
    skills: [],
    projects: [],
    contact: {},
  },
  html: "<html></html>",
  shareSlug: "abc12345",
  downloadUrl: "data:text/html;charset=utf-8,%3Chtml%3E%3C%2Fhtml%3E",
};

describe("jobs store", () => {
  it("createJob returns a record with status processing", () => {
    const job = createJob();
    expect(job.status).toBe("processing");
    expect(typeof job.id).toBe("string");
    expect(job.id.length).toBeGreaterThan(0);
    expect(job.result).toBeUndefined();
  });

  it("getJob returns the created job", () => {
    const job = createJob();
    const found = getJob(job.id);
    expect(found).not.toBeNull();
    expect(found!.id).toBe(job.id);
  });

  it("getJob returns null for an unknown id", () => {
    expect(getJob("does-not-exist")).toBeNull();
  });

  it("setJobResult transitions job to ready with the result", () => {
    const job = createJob();
    const result = { ...mockResult, jobId: job.id };
    setJobResult(job.id, result);
    const updated = getJob(job.id);
    expect(updated!.status).toBe("ready");
    expect(updated!.result).toEqual(result);
  });

  it("setJobError transitions job to error with an error message", () => {
    const job = createJob();
    setJobError(job.id, "Something went wrong");
    const updated = getJob(job.id);
    expect(updated!.status).toBe("error");
    expect(updated!.error).toBe("Something went wrong");
  });

  it("setJobResult throws for an unknown job id", () => {
    expect(() => setJobResult("no-such-id", mockResult)).toThrow("Job no-such-id not found");
  });

  it("setJobError throws for an unknown job id", () => {
    expect(() => setJobError("no-such-id", "oops")).toThrow("Job no-such-id not found");
  });
});
