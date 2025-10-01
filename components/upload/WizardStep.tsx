"use client";

import Link from "next/link";
import { ArrowPathIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@/components/ui/Spinner";
import { CopyButton } from "@/components/ui/CopyButton";
import type { GenerationResult } from "@/lib/ai/types";

const STATUS_LABELS: Record<"idle" | "processing" | "success" | "error", string> = {
  idle: "Awaiting upload",
  processing: "AI is generating your portfolio…",
  success: "Portfolio ready",
  error: "We couldn't process that. Try again.",
};

type WizardStepProps = {
  status: "idle" | "processing" | "success" | "error";
  onReset: () => void;
  result: GenerationResult | null;
  errorMessage: string | null;
};

export function WizardStep({ status, onReset, result, errorMessage }: WizardStepProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Status</p>
          <p className="text-base text-white">{STATUS_LABELS[status]}</p>
        </div>

        {status === "processing" && <Spinner label="Generating" />}

        {status === "error" && errorMessage && (
          <p className="text-xs text-rose-400">{errorMessage}</p>
        )}

        {status === "success" && result && (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/preview/${result.shareSlug}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary hover:text-primary"
            >
              <span>Open share link</span>
            </Link>
            <a
              href={result.downloadUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-primary/90"
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              <span>Download HTML</span>
            </a>
            <CopyButton value={`/preview/${result.shareSlug}`} makeAbsolute />
          </div>
        )}

        {(status === "error" || status === "success") && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary hover:text-primary"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
