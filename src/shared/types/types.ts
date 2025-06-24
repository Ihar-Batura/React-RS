export interface Character {
  uid: string;
  name: string;
  gender?: string;
  yearOfBirth?: number;
  monthOfBirth?: number;
  dayOfBirth?: number;
  placeOfBirth?: string;
  yearOfDeath?: number;
  monthOfDeath?: number;
  dayOfDeath?: number;
  placeOfDeath?: string;
  height?: number;
  weight?: number;
  deceased?: boolean;
  bloodType?: string;
  maritalStatus?: string;
  serialNumber?: string;
  hologramActivationDate?: string;
  hologramStatus?: string;
  hologramDateStatus?: string;
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
