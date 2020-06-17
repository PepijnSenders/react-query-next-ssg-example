import { useQuery, AnyQueryKey, usePaginatedQuery } from 'react-query';
import unfetch from 'isomorphic-unfetch';
import { API_BASE } from '.';

export interface Episode {
  id: number;
  name: string;
  air_date: Date;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}

export interface InfoResponse {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiListResponse<TData> {
  info: InfoResponse;
  results: TData;
}

export const getEpisodes = async (_: string, page: number = 0) => {
  const response = await unfetch(`${API_BASE}/episode?page=${page}`);

  const result: ApiListResponse<Episode[]> = await response.json();

  return result;
};

export const getEpisode = async (_: string, id: number): Promise<Episode> => {
  const result = await unfetch(`${API_BASE}/episode/${id}`);

  return await result.json();
};

export const useEpisodes = (page: number = 0) => {
  return usePaginatedQuery<ApiListResponse<Episode[]>, AnyQueryKey>(
    ['episodes', page],
    getEpisodes
  );
};

export const useEpisode = (id: number) => {
  return useQuery<Episode, AnyQueryKey>(['episode', id], getEpisode);
};
