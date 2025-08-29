import type { Data } from '../types/types';

let data: Data | null = null;
let promise: Promise<void> | null = null;

export function useDataLoader(): Data {
  if (!promise) {
    promise = fetch('/data/owid-co2-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load data');
        return res.json();
      })
      .then((jsonData: Data) => {
        data = jsonData;
      });
  }

  if (!data) {
    throw promise;
  }

  return data;
}
