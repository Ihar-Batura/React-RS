import { describe, expect, Mock } from 'vitest';
import apiGetCharacterData from '../src/shared/api/apiGetCharacterData';
import type { Character } from '../src/shared/types/types';

const mockFetch = vi.fn() as Mock;
vi.stubGlobal('fetch', mockFetch);

const mockCharacterData: Character = {
  uid: 'CHMA0000009075',
  name: 'Spock',
  gender: 'M',
  yearOfBirth: 2230,
  monthOfBirth: null,
  dayOfBirth: null,
  placeOfBirth: null,
  yearOfDeath: null,
  monthOfDeath: null,
  dayOfDeath: null,
  placeOfDeath: null,
  height: null,
  weight: null,
  deceased: null,
  bloodType: null,
  maritalStatus: 'MARRIED',
  serialNumber: null,
  hologramActivationDate: null,
  hologramStatus: null,
  hologramDateStatus: null,
  hologram: false,
  fictionalCharacter: false,
  mirror: true,
  alternateReality: false,
  performers: [],
  episodes: [],
  movies: [],
  characterSpecies: [],
  characterRelations: [],
  titles: [],
  occupations: [
    {
      uid: 'CHMA00000090751',
      name: 'USA',
      legalOccupation: false,
      medicalOccupation: true,
      scientificOccupation: true,
    },
  ],
  organizations: [],
};

describe('apiGetCharacterData', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should successfully return search result', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ character: mockCharacterData }),
    });

    const result = await apiGetCharacterData('CHMA0000009075');

    expect(fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/character?uid=CHMA0000009075',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    expect(result).toEqual(mockCharacterData);
  });

  it('should throw an error on unsuccessful HTTP response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(apiGetCharacterData('CHMA0000009075')).rejects.toThrowError(
      'HTTP error! Status: 500'
    );
  });
});
