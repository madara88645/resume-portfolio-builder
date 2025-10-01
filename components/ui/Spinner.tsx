"use client";

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
      <span className="inline-flex h-8 w-8 animate-spin items-center justify-center rounded-full border-2 border-slate-700 border-t-primary" />
      {label && <span>{label}</span>}
    </div>
  );
}
