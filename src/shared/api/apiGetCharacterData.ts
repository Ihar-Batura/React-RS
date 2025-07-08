import { Character } from '../types/types';

interface CharacterResponse {
  character: Character;
}

export default async function apiGetCharacterData(
  uid: string
): Promise<Character> {
  const BASE_URL = 'https://stapi.co/api';
  const url = `${BASE_URL}/v1/rest/character?uid=${uid}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: CharacterResponse = await response.json();

    return data.character;
  } catch (error: unknown) {
    console.error('Error getting character data:', error);
    throw error;
  }
}
