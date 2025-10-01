"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { FileDropzone } from "./FileDropzone";
import { LinkedInURLForm } from "./LinkedInURLForm";
import { SampleResumePicker } from "./SampleResumePicker";
import { useGeneration } from "@/components/ai/useGeneration";
import { WizardStep } from "@/components/upload/WizardStep";

export function UploadWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const { status, submitUpload, reset, result, errorMessage } = useGeneration();

  const steps = [
    "Upload",
    "AI Generates",
    "Preview & Download",
  ];

  useEffect(() => {
    if (status === "idle") {
      setActiveStep(0);
    } else if (status === "processing") {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  }, [status]);

  const handleReset = () => {
    reset();
    setActiveStep(0);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl">
      <div className="flex flex-col gap-8">
        <WizardProgress steps={steps} active={activeStep} />

        <section className="grid gap-6 lg:grid-cols-3">
          <FileDropzone
            disabled={status === "processing"}
            onUpload={async (file: File) => {
              await submitUpload({ file });
            }}
          />

          <LinkedInURLForm
            disabled={status === "processing"}
            onSubmit={async (url: string) => {
              await submitUpload({ linkedInUrl: url });
            }}
          />

          <SampleResumePicker
            disabled={status === "processing"}
            onSelect={async (file: File) => {
              await submitUpload({ file });
            }}
          />
        </section>

  <WizardStep status={status} onReset={handleReset} result={result} errorMessage={errorMessage} />
      </div>
    </div>
  );
}

function WizardProgress({ steps, active }: { steps: string[]; active: number }) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500">
      {steps.map((label, index) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={clsx(
              "flex h-6 w-6 items-center justify-center rounded-full border",
              index <= active
                ? "border-primary bg-primary text-white"
                : "border-slate-700 bg-slate-900 text-slate-400"
            )}
          >
            {index + 1}
          </span>
          <span className={clsx(index <= active ? "text-white" : "text-slate-500")}>{label}</span>
          {index < steps.length - 1 && <span className="text-slate-700">—</span>}
        </li>
      ))}
    </ol>
  );
}
