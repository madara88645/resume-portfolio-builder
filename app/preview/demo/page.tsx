import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";

const DEMO_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Demo Portfolio</title>
    <style>
      body { font-family: 'Inter', sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
      header { padding: 48px; background: linear-gradient(135deg, #2563eb, #1e40af); color: #fff; }
      section { padding: 32px 48px; }
      h1 { font-size: 2.5rem; margin-bottom: 8px; }
      h2 { color: #1e293b; margin-top: 32px; }
      ul { margin: 16px 0; padding-left: 20px; }
      .card { background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1); padding: 32px; margin-bottom: 24px; }
    </style>
  </head>
  <body>
    <header>
      <h1>Alex Morgan</h1>
      <p>AI Product Engineer · San Francisco, CA</p>
    </header>
    <section>
      <div class="card">
        <h2>Professional Summary</h2>
        <p>AI-driven engineer with 7+ years building user-centric products. Experienced in orchestrating LLM workflows, delivering intuitive UX, and shipping cross-platform experiences end-to-end.</p>
      </div>
      <div class="card">
        <h2>Experience</h2>
        <ul>
          <li>
            <strong>Lead Product Engineer · Synth Labs</strong><br />
            2021 — Present · Built multimodal resume generation platform adopted by 30k+ job seekers.
          </li>
          <li>
            <strong>Senior Frontend Engineer · Hyperloop</strong><br />
            2018 — 2021 · Led design system overhaul boosting conversion by 18%.
          </li>
        </ul>
      </div>
      <div class="card">
        <h2>Skills</h2>
        <ul>
          <li>React / Next.js</li>
          <li>Node.js / TypeScript</li>
          <li>Prompt engineering</li>
        </ul>
      </div>
    </section>
  </body>
</html>`;

export default function DemoPreviewPage() {
  return <PortfolioPreview html={DEMO_HTML} />;
}
