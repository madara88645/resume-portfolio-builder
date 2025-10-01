export type StoredAsset = {
  key: string;
  slug: string;
  url: string;
  downloadUrl: string;
};

const htmlStore = new Map<string, string>();

function buildDownloadUrl(html: string) {
  return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
}

/**
 * Ephemeral in-memory storage for generated HTML assets. Replace with S3/Supabase later.
 */
export async function storeHtmlAsset(jobId: string, html: string): Promise<StoredAsset> {
  const slug = jobId.slice(0, 8);
  htmlStore.set(slug, html);

  return {
    key: `portfolio/${slug}.html`,
    slug,
    url: `/preview/${slug}`,
    downloadUrl: buildDownloadUrl(html),
  };
}

export function loadHtmlAsset(slug: string): string | null {
  return htmlStore.get(slug) ?? null;
}
