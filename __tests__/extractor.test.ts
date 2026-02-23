import { extractTextFromLinkedIn } from "@/lib/parsing/extractor";

describe("extractTextFromLinkedIn", () => {
  it("rejects a completely invalid URL", async () => {
    await expect(extractTextFromLinkedIn("not-a-url")).rejects.toThrow("Invalid LinkedIn URL");
  });

  it("rejects a non-LinkedIn URL", async () => {
    await expect(extractTextFromLinkedIn("https://twitter.com/user")).rejects.toThrow(
      "Invalid LinkedIn URL"
    );
  });

  it("rejects an empty string", async () => {
    await expect(extractTextFromLinkedIn("")).rejects.toThrow("Invalid LinkedIn URL");
  });

  it("accepts a standard linkedin.com/in/ URL and returns instructions", async () => {
    const result = await extractTextFromLinkedIn("https://www.linkedin.com/in/johndoe");
    expect(result).toContain("LinkedIn Profile Extraction Note");
    expect(result).toContain("https://www.linkedin.com/in/johndoe");
  });

  it("accepts an http (non-https) linkedin URL", async () => {
    const result = await extractTextFromLinkedIn("http://linkedin.com/pub/janedoe");
    expect(result).toContain("LinkedIn Profile Extraction Note");
  });

  it("includes guidance about manual data export in the response", async () => {
    const result = await extractTextFromLinkedIn("https://linkedin.com/in/test");
    expect(result).toContain("Work Experience");
    expect(result).toContain("Skills");
  });
});
