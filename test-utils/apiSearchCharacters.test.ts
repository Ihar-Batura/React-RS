import { describe, expect, Mock } from 'vitest';
import apiSearchCharacters from '../src/shared/api/apiSearchCharacters';
import type { CharactersResponse } from '../src/shared/types/types';

const mockFetch = vi.fn() as Mock;
vi.stubGlobal('fetch', mockFetch);

const mockCharactersData: CharactersResponse = {
  characters: [
    {
      uid: '1Y7p',
      name: 'Olympic',
      gender: 'M',
      yearOfBirth: 2000,
      monthOfBirth: 1,
      dayOfBirth: 1,
      placeOfBirth: 'Moon',
      yearOfDeath: null,
      monthOfDeath: null,
      dayOfDeath: null,
      placeOfDeath: null,
      height: null,
      weight: null,
      deceased: false,
      bloodType: null,
      maritalStatus: null,
      serialNumber: null,
      hologramActivationDate: null,
      hologramStatus: 'No',
      hologramDateStatus: null,
      hologram: true,
      fictionalCharacter: true,
      mirror: true,
      alternateReality: true,
      performers: [],
      episodes: [],
      movies: [],
      characterSpecies: [],
      characterRelations: [],
      titles: [],
      occupations: [],
      organizations: [],
    },
  ],
  page: {
    firstPage: true,
    lastPage: false,
    numberOfElements: 1,
    pageNumber: 0,
    pageSize: 20,
    totalElements: 1,
    totalPages: 1,
  },
  sort: {
    clauses: [],
  },
};

describe('apiSearchCharacters', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should successfully return search results', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockCharactersData,
    });

    const result = await apiSearchCharacters('Spock', 0);

    expect(fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/character/search?pageNumber=0&pageSize=20',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'name=Spock',
      }
    );

    expect(result).toEqual(mockCharactersData);
  });

  it('should throw an error on unsuccessful HTTP response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(apiSearchCharacters('test', 0)).rejects.toThrowError(
      'HTTP error! Status: 500'
    );
  });
});
