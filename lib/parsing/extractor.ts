/**
 * Text extraction utilities for CV files (PDF, DOCX, TXT) and LinkedIn profiles.
 * Supports PDF parsing via pdf-parse and DOCX parsing via mammoth.
 */
import mammoth from "mammoth";

/**
 * Extracts text from uploaded file based on MIME type
 * Supports: PDF, DOCX, TXT, and plain text files
 */
export async function extractTextFromFile(file: File): Promise<string> {
  try {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    // Handle PDF files
    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      return await extractPdfText(file);
    }

    // Handle DOCX files
    if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx")
    ) {
      return await extractDocxText(file);
    }

    // Handle DOC files (legacy Word format)
    if (fileType === "application/msword" || fileName.endsWith(".doc")) {
      throw new Error("Legacy .doc format not supported. Please convert to .docx or PDF.");
    }

    // Handle plain text files
    if (fileType === "text/plain" || fileName.endsWith(".txt")) {
      return await file.text();
    }

    // Fallback: try to read as text
    console.warn(`Unknown file type: ${fileType}. Attempting to read as text.`);
    return await file.text();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to read uploaded file";
    throw new Error(message);
  }
}

/**
 * Extracts text from PDF file using pdf-parse (dynamic import to avoid build issues)
 */
async function extractPdfText(file: File): Promise<string> {
  try {
    // Dynamic import to avoid pdf-parse test file issues during build
    const pdfParse = (await import("pdf-parse")).default;
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error("PDF appears to be empty or text could not be extracted");
    }

    return data.text;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to parse PDF";
    throw new Error(`PDF parsing error: ${message}`);
  }
}

/**
 * Extracts text from DOCX file using mammoth
 */
async function extractDocxText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    if (!result.value || result.value.trim().length === 0) {
      throw new Error("DOCX appears to be empty or text could not be extracted");
    }

    // Log any conversion messages/warnings
    if (result.messages.length > 0) {
      console.warn("DOCX conversion messages:", result.messages);
    }

    return result.value;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to parse DOCX";
    throw new Error(`DOCX parsing error: ${message}`);
  }
}

/**
 * Extracts profile data from LinkedIn URL
 * Note: This is a simplified version. Full LinkedIn scraping requires:
 * - Authentication/API access
 * - Playwright/Puppeteer for dynamic content
 * - Compliance with LinkedIn's Terms of Service
 * 
 * For MVP, we accept LinkedIn URL and ask user to paste their profile text
 */
export async function extractTextFromLinkedIn(linkedInUrl: string): Promise<string> {
  if (!/^https?:\/\/(www\.)?linkedin\.com\//i.test(linkedInUrl)) {
    throw new Error("Invalid LinkedIn URL");
  }

  // In a production environment, you would:
  // 1. Use LinkedIn API (requires OAuth)
  // 2. Use web scraping (may violate ToS)
  // 3. Ask user to export their profile data

  return `LinkedIn Profile Extraction Note:

Due to LinkedIn's Terms of Service and privacy policies, automated scraping is not supported.

Please copy and paste your LinkedIn profile information including:
- Summary/About section
- Work Experience
- Education
- Skills
- Projects and accomplishments

URL provided: ${linkedInUrl}

Alternative: You can export your profile data from LinkedIn Settings > Data Privacy > Get a copy of your data.`;
}
