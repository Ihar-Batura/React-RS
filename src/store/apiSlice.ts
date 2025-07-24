import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharactersResponse } from '../shared/types/types';

interface CharactersSearchData {
  term: string;
  page: number;
}

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest',
  }),
  tagTypes: ['Character', 'CharacterList'],
  endpoints: (build) => ({
    getCharacterByUid: build.query<Character, string>({
      query: (uid) => `/character?uid=${uid}`,
      transformResponse: (response: { character: Character }) =>
        response.character,
      providesTags: (_, __, uid) => [{ type: 'Character', id: uid }],
    }),

    searchCharacters: build.query<CharactersResponse, CharactersSearchData>({
      query: ({ term, page }) => ({
        url: `/character/search?pageNumber=${page}&pageSize=20`,
        method: 'POST',
        body: `name=${term}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
      providesTags: (_, __, { term }) => [{ type: 'CharacterList', id: term }],
    }),
  }),
});

export const { useGetCharacterByUidQuery, useSearchCharactersQuery } =
  characterApi;
