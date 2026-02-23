import { storeHtmlAsset, loadHtmlAsset } from "@/lib/storage/storage";

describe("HTML asset storage", () => {
  const jobId = "aaaabbbb-cccc-dddd-eeee-ffff00001111";
  const html = "<!DOCTYPE html><html><body>Hello</body></html>";

  it("storeHtmlAsset returns an asset with a slug derived from jobId", async () => {
    const asset = await storeHtmlAsset(jobId, html);
    expect(asset.slug).toBe(jobId.slice(0, 8));
    expect(asset.key).toBe(`portfolio/${asset.slug}.html`);
    expect(asset.url).toBe(`/preview/${asset.slug}`);
  });

  it("storeHtmlAsset encodes the HTML into a data URL for download", async () => {
    const asset = await storeHtmlAsset(jobId, html);
    expect(asset.downloadUrl).toContain("data:text/html;charset=utf-8,");
    expect(asset.downloadUrl).toContain(encodeURIComponent(html));
  });

  it("loadHtmlAsset retrieves the stored HTML by slug", async () => {
    const asset = await storeHtmlAsset(jobId, html);
    const loaded = loadHtmlAsset(asset.slug);
    expect(loaded).toBe(html);
  });

  it("loadHtmlAsset returns null for an unknown slug", () => {
    expect(loadHtmlAsset("unknown0")).toBeNull();
  });

  it("storeHtmlAsset overwrites existing asset with same jobId", async () => {
    const updatedHtml = "<html><body>Updated</body></html>";
    const asset1 = await storeHtmlAsset(jobId, html);
    await storeHtmlAsset(jobId, updatedHtml);
    const loaded = loadHtmlAsset(asset1.slug);
    expect(loaded).toBe(updatedHtml);
  });
});
