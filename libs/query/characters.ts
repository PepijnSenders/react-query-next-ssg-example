import { useQuery, AnyQueryKey, usePaginatedQuery } from 'react-query';
import unfetch from 'isomorphic-unfetch';
import { API_BASE } from '.';

export interface LocationReference {
  name: string;
  url: string;
}

export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  unknown = 'unknown',
}

export enum CharacterGender {
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  unknown = 'unknown',
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: LocationReference;
  location: LocationReference;
  image: string;
  episode: string[];
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

export const getCharacters = async (_: string, page: number = 0) => {
  const response = await unfetch(`${API_BASE}/character?page=${page}`);

  const result: ApiListResponse<Character[]> = await response.json();

  return result;
};

export const getCharacter = async (
  _: string,
  id: number
): Promise<Character> => {
  const result = await unfetch(`${API_BASE}/character/${id}`);

  return await result.json();
};

export const useCharacters = (page: number = 0) => {
  return usePaginatedQuery<ApiListResponse<Character[]>, AnyQueryKey>(
    ['characters', page],
    getCharacters
  );
};

export const useCharacter = (id: number) => {
  return useQuery<Character, AnyQueryKey>(['character', id], getCharacter);
};
