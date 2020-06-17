import { useQuery, AnyQueryKey, usePaginatedQuery } from 'react-query';
import unfetch from 'isomorphic-unfetch';
import { API_BASE } from '.';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
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

export const getLocations = async (_: string, page: number = 0) => {
  const response = await unfetch(`${API_BASE}/location?page=${page}`);

  const result: ApiListResponse<Location[]> = await response.json();

  return result;
};

export const getLocation = async (_: string, id: number): Promise<Location> => {
  const result = await unfetch(`${API_BASE}/location/${id}`);

  return await result.json();
};

export const useLocations = (page: number = 0) => {
  return usePaginatedQuery<ApiListResponse<Location[]>, AnyQueryKey>(
    ['locations', page],
    getLocations
  );
};

export const useLocation = (id: number) => {
  return useQuery<Location, AnyQueryKey>(['location', id], getLocation);
};
