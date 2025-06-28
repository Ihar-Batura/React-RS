import { CharactersResponse } from '../types/types';

export async function apiGetAllCharacters(): Promise<CharactersResponse> {
  const BASE_URL = 'https://stapi.co/api';
  const url = `${BASE_URL}/v1/rest/character/search?pageNumber=0&pageSize=100`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: CharactersResponse = await response.json();

    return data;
  } catch (error: unknown) {
    console.error('Error getting all characters collection:', error);
    throw error;
  }
}
