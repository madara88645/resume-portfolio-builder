import { generateMockPortfolio } from "@/lib/ai/mock";

describe("generateMockPortfolio", () => {
  it("returns a GenerationResult with expected shape", async () => {
    const result = await generateMockPortfolio({ rawText: "John Doe\nSoftware Engineer", jobId: "test-job-1234" });
    expect(result.jobId).toBe("test-job-1234");
    expect(typeof result.summary).toBe("string");
    expect(result.summary.length).toBeGreaterThan(0);
    expect(typeof result.html).toBe("string");
    expect(result.html).toContain("<!DOCTYPE html>");
    expect(result.shareSlug).toBe("test-job");
    expect(result.downloadUrl).toContain("data:text/html;charset=utf-8,");
  });

  it("extracts a name from the raw text for the contact field", async () => {
    const result = await generateMockPortfolio({
      rawText: "Alice Smith\nSenior Developer at Globex Corp",
      jobId: "name-test-5678",
    });
    expect(result.structuredData.contact.fullName).toBe("Alice Smith");
  });

  it("uses 'Candidate' as fallback name when name cannot be parsed", async () => {
    const result = await generateMockPortfolio({
      rawText: "no recognisable name here",
      jobId: "fallback-abcd",
    });
    expect(result.structuredData.contact.fullName).toBe("Candidate");
  });

  it("always includes at least one experience entry", async () => {
    const result = await generateMockPortfolio({ rawText: "Some text", jobId: "exp-test-0001" });
    expect(result.structuredData.experience.length).toBeGreaterThan(0);
  });

  it("always includes skills array", async () => {
    const result = await generateMockPortfolio({ rawText: "Some text", jobId: "skills-test-0002" });
    expect(Array.isArray(result.structuredData.skills)).toBe(true);
    expect(result.structuredData.skills.length).toBeGreaterThan(0);
  });

  it("HTML output contains the candidate name from structured data", async () => {
    const result = await generateMockPortfolio({
      rawText: "Bob Jones\nProduct Manager",
      jobId: "html-test-1111",
    });
    expect(result.html).toContain(result.structuredData.contact.fullName!);
  });
});
