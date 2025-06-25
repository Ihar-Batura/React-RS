export interface Character {
  uid: string;
  name: string;
  gender: string | null;
  yearOfBirth: number | null;
  monthOfBirth: number | null;
  dayOfBirth: number | null;
  placeOfBirth: string | null;
  yearOfDeath: number | null;
  monthOfDeath: number | null;
  dayOfDeath: number | null;
  placeOfDeath: string | null;
  height: number | null;
  weight: number | null;
  deceased: boolean | null;
  bloodType: string | null;
  maritalStatus: string | null;
  serialNumber: string | null;
  hologramActivationDate: string | null;
  hologramStatus: string | null;
  hologramDateStatus: string | null;
  hologram: true;
  fictionalCharacter: true;
  mirror: true;
  alternateReality: true;
  performers: [[]];
  episodes: [[]];
  movies: [[]];
  characterSpecies: [[]];
  characterRelations: [[]];
  titles: [[]];
  occupations: [[]];
  organizations: [[]];
}

export interface CharactersResponse {
  characters: Character[];
  page: {
    firstPage: boolean;
    lastPage: boolean;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
  sort: {
    clauses: [];
  };
}
