"use client";

const STEPS = [
  {
    title: "Upload CV",
    description: "Drop in your CV file or paste a LinkedIn profile URL.",
  },
  {
    title: "AI Generates",
    description: "We parse your experience and draft a professional summary.",
  },
  {
    title: "Preview & Download",
    description: "Review the generated portfolio, download, or share instantly.",
  },
];

export function OnboardingStepper() {
  return (
    <div className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-8">
      <h2 className="text-xl font-semibold text-white">How it works</h2>
      <ol className="space-y-5 text-sm text-slate-300">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary/60 text-xs font-semibold text-primary">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold text-white">{step.title}</p>
              <p className="text-slate-400">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
