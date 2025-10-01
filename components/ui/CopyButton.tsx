"use client";

import { useCallback, useState } from "react";
import { CheckIcon, LinkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type CopyButtonProps = {
  value: string;
  makeAbsolute?: boolean;
  className?: string;
  label?: string;
};

export function CopyButton({ value, makeAbsolute = false, className, label = "Copy link" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      const resolvedValue = resolveValue(value, makeAbsolute);
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }
      await navigator.clipboard.writeText(resolvedValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy share link", error);
    }
  }, [value, makeAbsolute]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold transition",
        copied ? "border-emerald-400 text-emerald-300" : "text-white hover:border-primary hover:text-primary",
        className
      )}
    >
      {copied ? <CheckIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      <span>{copied ? "Link copied" : label}</span>
    </button>
  );
}

function resolveValue(value: string, makeAbsolute: boolean) {
  if (!makeAbsolute) {
    return value;
  }

  if (value.startsWith("http")) {
    return value;
  }

  if (typeof window === "undefined") {
    return value;
  }

  return new URL(value, window.location.origin).toString();
}
