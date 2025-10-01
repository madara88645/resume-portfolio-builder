export function PortfolioPreview({ html }: { html: string }) {
  return (
    <iframe
      srcDoc={html}
      title="Portfolio preview"
      sandbox="allow-same-origin"
      className="h-[calc(100vh-8rem)] w-full rounded-2xl border border-slate-800 bg-white"
    />
  );
}
