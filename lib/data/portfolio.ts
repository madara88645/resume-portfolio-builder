import { loadHtmlAsset } from "@/lib/storage/storage";

export async function loadGeneratedPortfolio(slug: string) {
  const html = loadHtmlAsset(slug);
  if (!html) {
    return null;
  }

  return { html };
}
