"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export function FileDropzone({
  onUpload,
  disabled,
}: {
  onUpload: (file: File) => Promise<void>;
  disabled?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }
      const file = acceptedFiles[0];
      if (!/\.(pdf|docx|txt)$/i.test(file.name)) {
        setError("Supported formats: PDF, DOCX, TXT");
        return;
      }
      setError(null);
      await onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: () => setError("Upload failed. Please try another file."),
    multiple: false,
    disabled,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 p-6 text-center transition hover:border-primary hover:bg-slate-900/60",
      })}
    >
      <input {...getInputProps()} />
      <ArrowUpTrayIcon className="mb-4 h-10 w-10 text-primary" />
      <p className="text-sm font-medium text-white">
        {isDragActive ? "Drop your CV here" : "Drag & drop CV or click to select"}
      </p>
      <p className="mt-2 text-xs text-slate-400">PDF, DOCX, or TXT up to 10MB</p>
      {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
