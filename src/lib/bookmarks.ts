export interface Bookmark {
  url: string;
  slug: string;
}

const slugPattern = /^mona-[0-9A-Za-z]{8}$/;

export function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;

  const explicitProtocol = trimmed.match(/^([a-z][a-z\d+.-]*):/i);
  const protocolIsHttp = /^https?:\/\//i.test(trimmed);
  const isHostAndPort = explicitProtocol && /^\d+(?:[/?#]|$)/.test(trimmed.slice(explicitProtocol[0].length));
  if (explicitProtocol && !protocolIsHttp && !isHostAndPort) return null;

  const candidate = protocolIsHttp ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

export function parseStoredBookmarks(raw: string | null): Bookmark[] {
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) return [];

  const bookmarks: Bookmark[] = [];
  const slugs = new Set<string>();

  for (const value of parsed) {
    if (
      typeof value !== 'object'
      || value === null
      || Array.isArray(value)
      || Object.keys(value).some((key) => key !== 'url' && key !== 'slug')
    ) {
      continue;
    }

    const record = value as Record<string, unknown>;
    if (
      typeof record.url !== 'string'
      || !record.url.trim()
      || record.url.trim() !== record.url
      || !normalizeUrl(record.url)
      || typeof record.slug !== 'string'
      || !slugPattern.test(record.slug)
      || slugs.has(record.slug)
    ) {
      continue;
    }

    bookmarks.push({ url: record.url, slug: record.slug });
    slugs.add(record.slug);
  }

  return bookmarks;
}

export function formatBookmark(url: string, slug: string): string {
  return `${url} :: ${slug}`;
}
