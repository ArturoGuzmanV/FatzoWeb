export const DEFAULT_MENU_APP_URL = 'https://app.gusto.cl';

/**
 * Resolves the external digital menu application URL from Vite env or fallback.
 * Keeps the commercial landing page decoupled from the untouched digital menu app.
 */
export function resolveMenuAppUrl(envUrl?: string): string {
  const raw = (envUrl ?? '').trim();
  if (!raw) {
    return DEFAULT_MENU_APP_URL;
  }

  // Allow relative subpath routing (e.g., "/menu") or absolute http(s) URLs (e.g., "https://app.gusto.cl")
  if (raw.startsWith('/')) {
    return raw.length > 1 ? raw.replace(/\/+$/, '') : '/';
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/\/+$/, '');
  }

  return `https://${raw.replace(/\/+$/, '')}`;
}

/**
 * Formats a table label into a clean URL slug matching Gustō's QR convention (e.g., "Mesa 1" -> "mesa-1").
 */
export function formatTableSlug(tableName: string): string {
  return tableName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Builds a deep-link URL to the untouched digital menu for a specific table QR stand.
 */
export function buildTableMenuUrl(baseUrl: string, tableName?: string): string {
  const normalizedBase = resolveMenuAppUrl(baseUrl);
  if (!tableName || !tableName.trim()) {
    return normalizedBase;
  }

  const slug = formatTableSlug(tableName);
  if (!slug) {
    return normalizedBase;
  }

  return normalizedBase === '/' ? `/${slug}` : `${normalizedBase}/${slug}`;
}

export function getMenuAppUrl(): string {
  const envUrl =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_MENU_APP_URL as string | undefined)
      : undefined;
  return resolveMenuAppUrl(envUrl);
}
