import { DATA_PARSING_PROMPT, PORTFOLIO_PROMPT, SUMMARY_PROMPT } from "@/lib/ai/prompts";
import { ResumeSchema, ResumePayload } from "@/lib/ai/schema";
import { GenerationResult } from "@/lib/ai/types";
import { storeHtmlAsset } from "@/lib/storage/storage";

export type MockGenerationInput = {
  rawText: string;
  jobId: string;
};

function buildFallbackResume(rawText: string): ResumePayload {
  const sentences = rawText.split(/\n+/).map((item) => item.trim()).filter(Boolean);
  const headline = sentences[0] ?? "Experienced Professional";
  const nameMatch = headline.match(/([A-Z][a-z]+\s+[A-Z][a-z]+)/);
  const fullName = nameMatch ? nameMatch[1] : "Candidate";

  return ResumeSchema.parse({
    experience: [
      {
        company: "Example Corp",
        title: "Software Engineer",
        startDate: "2019",
        endDate: "Present",
        responsibilities: [
          "Designed and shipped production-ready features across the stack.",
          "Collaborated with cross-functional teams to deliver user-focused solutions.",
        ],
        location: "Remote",
      },
    ],
    education: [
      {
        institution: "State University",
        degree: "B.Sc. Computer Science",
        startDate: "2015",
        endDate: "2019",
      },
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
    projects: [
      {
        name: "Portfolio Builder",
        description: "Created an AI-assisted portfolio generator to help candidates stand out.",
      },
    ],
    contact: {
      fullName,
      email: "candidate@example.com",
      location: "Remote",
      website: "https://example.com",
      social: [{ label: "LinkedIn", url: "https://linkedin.com/in/example" }],
    },
  });
}

function renderPortfolioHtml(summary: string, resume: ResumePayload): string {
  const experienceItems = resume.experience
    .map((item) => `
      <li>
        <div class="font-semibold text-slate-900">${item.title} · ${item.company}</div>
        <div class="text-sm text-slate-500">${item.startDate ?? ""} – ${item.endDate ?? "Present"}</div>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          ${item.responsibilities.map((line: string) => `<li>${line}</li>`).join("")}
        </ul>
      </li>
    `)
    .join("");

  const skills = resume.skills.map((skill: string) => `<span class="chip">${skill}</span>`).join("");

  const projects = resume.projects
    .map((project) => `
      <li>
        <div class="font-semibold text-slate-900">${project.name}</div>
        <p class="text-sm text-slate-600">${project.description}</p>
      </li>
    `)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${resume.contact.fullName ?? "AI Portfolio"}</title>
  <style>
    :root { color-scheme: light; font-family: 'Inter', system-ui, sans-serif; }
    body { margin: 0; background: #f8fafc; color: #0f172a; }
    header { padding: 48px; background: linear-gradient(135deg, #2563eb, #1e3a8a); color: #fff; }
    main { padding: 32px 48px 64px; display: grid; gap: 32px; }
    section { background: #fff; border-radius: 24px; padding: 32px; box-shadow: 0 20px 40px rgba(15,23,42,0.08); }
    h1 { margin: 0; font-size: 2.75rem; letter-spacing: -0.02em; }
    h2 { margin-bottom: 18px; font-size: 1.35rem; color: #1e293b; }
    ul { margin: 0; padding: 0; list-style: none; }
    .chip { display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 9999px; background: rgba(37,99,235,0.1); color: #1d4ed8; font-size: 0.85rem; margin: 4px 8px 4px 0; }
    .contact { display: flex; flex-wrap: wrap; gap: 16px 24px; font-size: 0.95rem; color: rgba(15,23,42,0.72); }
    @media (max-width: 768px) {
      header, main { padding: 24px; }
      section { padding: 24px; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${resume.contact.fullName ?? "Candidate"}</h1>
    <p>${summary}</p>
    <div class="contact">
      ${resume.contact.email ? `<span>${resume.contact.email}</span>` : ""}
      ${resume.contact.location ? `<span>${resume.contact.location}</span>` : ""}
      ${resume.contact.website ? `<a href="${resume.contact.website}">${resume.contact.website}</a>` : ""}
    </div>
  </header>
  <main>
    <section>
      <h2>Experience</h2>
      <ul>${experienceItems}</ul>
    </section>
    <section>
      <h2>Projects</h2>
      <ul>${projects}</ul>
    </section>
    <section>
      <h2>Skills</h2>
      <div>${skills}</div>
    </section>
  </main>
</body>
</html>`;
}

function buildMockSummary(resume: ResumePayload): string {
  const role = resume.experience[0]?.title ?? "Multidisciplinary professional";
  const company = resume.experience[0]?.company ?? "leading organizations";
  return `${role} experienced in shipping AI-assisted products for ${company}. Passionate about quality delivery, user-centric design, and measurable business impact.`;
}

export async function generateMockPortfolio({ rawText, jobId }: MockGenerationInput): Promise<GenerationResult> {
  const resume = buildFallbackResume(rawText);
  const summary = buildMockSummary(resume);
  const html = renderPortfolioHtml(summary, resume);
  const storedAsset = await storeHtmlAsset(jobId, html);

  return {
    jobId,
    summary,
    structuredData: resume,
    html,
    shareSlug: storedAsset.slug,
    downloadUrl: storedAsset.downloadUrl,
  };
}

export const PROMPT_REFERENCES = {
  DATA_PARSING_PROMPT,
  SUMMARY_PROMPT,
  PORTFOLIO_PROMPT,
};
