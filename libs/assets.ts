export function getCdnBase(): string {
  const base = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "";
  return base.replace(/\/$/, "");
}

export function cdnUrl(path: string): string {
  const p = path.replace(/^\/+/, "");
  const base = getCdnBase();
  if (!base) return `/${p}`;
  return `${base}/${p}`;
}
