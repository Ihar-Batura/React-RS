import { CharactersResponse } from '../types/types';

export async function apiGetCharacters(
  term: string
): Promise<CharactersResponse> {
  const BASE_URL = 'https://stapi.co/api';
  const url = `${BASE_URL}/v1/rest/character/search`;

  try {
    const body = new URLSearchParams();
    body.append('name', term);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error character collection:', error);
    throw error;
  }
}
