"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { GenerationJobStatus, GenerationResult, UploadRequest } from "@/lib/ai/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGeneration() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, mutate } = useSWR<{ status: GenerationJobStatus; result?: GenerationResult; error?: string }>(
    jobId ? `/api/upload?jobId=${jobId}` : null,
    fetcher,
    {
      refreshInterval: status === "processing" ? 2000 : 0,
    }
  );

  const submitUpload = useCallback(
    async (payload: UploadRequest) => {
      setStatus("processing");
      setErrorMessage(null);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: buildFormData(payload),
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const { jobId: newJobId, error: responseError } = await response.json();
        if (!newJobId) {
          throw new Error(responseError ?? "Job creation failed");
        }
        setJobId(newJobId);
        mutate();
      } catch (error) {
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      }
    },
    [mutate]
  );

  const reset = useCallback(() => {
    setJobId(null);
    setStatus("idle");
    setErrorMessage(null);
    mutate(undefined, { revalidate: false });
  }, [mutate]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.status === "ready") {
      setStatus("success");
      return;
    }

    if (data.status === "error") {
      setStatus("error");
      setErrorMessage(data.error ?? "We couldn’t process that file. Try another CV.");
      return;
    }

    setStatus("processing");
  }, [data]);

  const result = useMemo(() => data?.result ?? null, [data]);

  return {
    status,
    errorMessage,
    jobId,
    result,
    submitUpload,
    reset,
  };
}

function buildFormData(payload: UploadRequest) {
  const formData = new FormData();
  if (payload.file) {
    formData.append("file", payload.file);
  }
  if (payload.linkedInUrl) {
    formData.append("linkedInUrl", payload.linkedInUrl);
  }
  return formData;
}
