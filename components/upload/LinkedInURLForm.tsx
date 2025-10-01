"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type FormValues = {
  linkedInUrl: string;
};

export function LinkedInURLForm({
  disabled,
  onSubmit,
}: {
  disabled?: boolean;
  onSubmit: (url: string) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { linkedInUrl: "" },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(
    async (values: FormValues) => {
      setSubmitError(null);
      try {
        await onSubmit(values.linkedInUrl);
        reset();
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Unable to process LinkedIn profile");
      }
    },
    [onSubmit, reset]
  );

  return (
    <form
      className="flex h-full flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="space-y-4">
        <label className="space-y-2 text-left">
          <span className="text-sm font-medium text-white">LinkedIn profile URL</span>
          <input
            {...register("linkedInUrl", {
              required: "LinkedIn URL is required",
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\//i,
                message: "Please enter a valid LinkedIn URL",
              },
            })}
            placeholder="https://www.linkedin.com/in/your-profile"
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            disabled={disabled || isSubmitting}
          />
        </label>
        {errors.linkedInUrl && <p className="text-xs text-rose-400">{errors.linkedInUrl.message}</p>}
        {submitError && <p className="text-xs text-rose-400">{submitError}</p>}
      </div>

      <button
        type="submit"
        disabled={disabled || isSubmitting}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        <PaperAirplaneIcon className="h-4 w-4" />
        Generate portfolio
      </button>
    </form>
  );
}
