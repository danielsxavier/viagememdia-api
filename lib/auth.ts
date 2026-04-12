const BEARER_PREFIX = 'Bearer ';

/**
 * Rotas públicas dentro de /api.
 *
 * Para tornar /api/health público, adicione '/api/health' nesta lista.
 */
export const PUBLIC_API_PATHS = new Set<string>([]);

function getApiToken(): string | null {
  const token = process.env.API_TOKEN?.trim();
  return token ? token : null;
}

export function isPublicApiPath(pathname: string): boolean {
  return PUBLIC_API_PATHS.has(pathname);
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
    return null;
  }

  const token = authHeader.slice(BEARER_PREFIX.length).trim();
  return token ? token : null;
}

export function isValidApiToken(token: string | null): boolean {
  const configuredToken = getApiToken();

  if (!configuredToken || !token) {
    return false;
  }

  return token === configuredToken;
}
