let contentCache: any = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 120 * 1000; // 2 minutes in-memory cache

export function getContentCache(): any | null {
  if (contentCache && Date.now() - lastCacheTime < CACHE_TTL_MS) {
    return contentCache;
  }
  return null;
}

export function setContentCache(data: any): void {
  contentCache = data;
  lastCacheTime = Date.now();
}

export function clearContentCache(): void {
  contentCache = null;
  lastCacheTime = 0;
}

