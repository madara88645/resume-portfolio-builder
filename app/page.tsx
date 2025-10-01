import Link from "next/link";
import { Suspense } from "react";
import { UploadWizard } from "@/components/upload/UploadWizard";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-wide text-slate-400">Phase 1 · MVP</p>
        <h1 className="text-4xl font-semibold leading-tight text-white">
          AI-Powered Résumé & Portfolio Builder
        </h1>
        <p className="text-lg text-slate-300">
          Upload your CV or LinkedIn profile. Let AI parse, summarize, and design a shareable single-page portfolio in minutes.
        </p>
      </header>

      <section className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Suspense fallback={<div className="rounded-xl border border-slate-800 p-10">Loading experience…</div>}>
          <UploadWizard />
        </Suspense>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 shadow-xl">
            <OnboardingStepper />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Coming soon</h2>
            <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-slate-300">
              <li>LinkedIn &ldquo;About Me&rdquo; automation</li>
              <li>Visual timeline & skill bars</li>
              <li>English & Turkish variants</li>
            </ul>

            <div className="mt-10">
              <Link
                href="/preview/demo"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                View demo portfolio
              </Link>
            </div>
          </div>

        </aside>
      </section>
    </main>
  );
}
