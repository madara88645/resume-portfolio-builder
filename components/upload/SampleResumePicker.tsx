"use client";

import { useState } from "react";
import { DocumentTextIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface SampleResume {
  id: string;
  title: string;
  description: string;
  filename: string;
}

const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: "developer",
    title: "Full-Stack Developer",
    description: "Senior developer with 8+ years experience",
    filename: "sample-resume-developer.txt",
  },
  {
    id: "marketing",
    title: "Marketing Manager",
    description: "Digital marketing expert with MBA",
    filename: "sample-resume-marketing.txt",
  },
];

interface SampleResumePickerProps {
  disabled?: boolean;
  onSelect: (file: File) => void;
}

export function SampleResumePicker({ disabled, onSelect }: SampleResumePickerProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectSample = async (sample: SampleResume) => {
    if (disabled) return;
    
    setLoading(sample.id);
    try {
      const response = await fetch(`/samples/${sample.filename}`);
      if (!response.ok) throw new Error("Failed to load sample");
      
      const text = await response.text();
      const file = new File([text], sample.filename, { type: "text/plain" });
      onSelect(file);
    } catch (error) {
      console.error("Error loading sample:", error);
      alert("Failed to load sample resume. Please try uploading your own file.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-white">Try with Sample Resume</h3>
      </div>
      
      <p className="mb-4 text-xs text-slate-400">
        Don&rsquo;t have a resume ready? Test the AI with our sample CVs.
      </p>

      <div className="grid gap-3">
        {SAMPLE_RESUMES.map((sample) => (
          <button
            key={sample.id}
            onClick={() => handleSelectSample(sample)}
            disabled={disabled || loading !== null}
            className="flex items-start gap-3 rounded-lg border border-slate-600 bg-slate-900/50 p-3 text-left transition hover:border-primary hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <DocumentTextIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{sample.title}</div>
              <div className="text-xs text-slate-400">{sample.description}</div>
            </div>
            {loading === sample.id && (
              <div className="flex-shrink-0">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-slate-900/50 p-3">
        <p className="text-xs text-slate-400">
          💡 <strong className="text-slate-300">Tip:</strong> These samples demonstrate
          how the AI parses and structures resume data. Your actual results will vary based
          on your CV&rsquo;s content and format.
        </p>
      </div>
    </div>
  );
}
