import { makeQueryCache, AnyQueryKey, BaseQueryOptions } from "react-query";

export const API_BASE = "https://rickandmortyapi.com/api";

interface QueryCache {
  setQueryData<T = unknown>(
    key: AnyQueryKey | string,
    dataOrUpdater: T | undefined | ((oldData: T | undefined) => T | undefined),
    config: BaseQueryOptions
  ): void;
}

export interface QueryInitialCacheItem {
  key: string;
  data: any;
}

export const hydrateCache = (
  queryCache: QueryCache,
  queryInitialCache: QueryInitialCacheItem[]
) => {
  queryInitialCache.forEach((cacheItem) => {
    queryCache.setQueryData(cacheItem.key, cacheItem.data, {
      staleTime: 1000, // Set stale time to not refetch directly on client mount
    });
  });
};

export const getQueryCache = (
  shouldFreezeCache: boolean = false,
  queryInitialCache: QueryInitialCacheItem[] = []
) => {
  const queryCache = makeQueryCache({ frozen: shouldFreezeCache });

  if (queryInitialCache.length > 0) {
    hydrateCache(queryCache, queryInitialCache);
  }

  return queryCache;
};
