import { notFound } from "next/navigation";
import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";
import { loadGeneratedPortfolio } from "@/lib/data/portfolio";

export default async function PreviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const result = await loadGeneratedPortfolio(params.slug);
  if (!result) {
    notFound();
  }

  return <PortfolioPreview html={result.html} />;
}
