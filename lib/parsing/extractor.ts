/**
 * Minimal text extractors used for the MVP. These should be replaced with
 * robust PDF/DOCX parsing utilities (e.g., pdf-parse, mammoth) in later phases.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  try {
    return await file.text();
  } catch (error) {
    throw new Error("Unable to read uploaded file");
  }
}

export async function extractTextFromLinkedIn(linkedInUrl: string): Promise<string> {
  if (!/^https?:\/\/(www\.)?linkedin\.com\//i.test(linkedInUrl)) {
    throw new Error("Invalid LinkedIn URL");
  }

  return `LinkedIn profile placeholder for ${linkedInUrl}`;
}
