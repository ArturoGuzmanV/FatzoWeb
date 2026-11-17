export const DEFAULT_LOGIN_APP_URL = 'https://needo-frontend.onrender.com';

export function resolveLoginAppUrl(envUrl?: string): string {
  const raw = (envUrl ?? '').trim();
  if (!raw) {
    return DEFAULT_LOGIN_APP_URL;
  }

  if (raw.startsWith('/')) {
    return raw.length > 1 ? raw.replace(/\/+$/, '') : '/';
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/\/+$/, '');
  }

  return `https://${raw.replace(/\/+$/, '')}`;
}

export function getLoginAppUrl(): string {
  const envUrl =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_LOGIN_APP_URL as string | undefined)
      : undefined;
  return resolveLoginAppUrl(envUrl);
}
