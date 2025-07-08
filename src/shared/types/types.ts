interface Performers {
  uid: string;
  name: string;
  birthName: string | null;
  gender: string;
  dateOfBirth: number | null;
  placeOfBirth: string | null;
  dateOfDeath: number | null;
  placeOfDeath: string | null;
  animalPerformer: boolean;
  disPerformer: boolean;
  ds9Performer: boolean;
  entPerformer: boolean;
  filmPerformer: boolean;
  standInPerformer: boolean;
  stuntPerformer: boolean;
  tasPerformer: boolean;
  tngPerformer: boolean;
  tosPerformer: boolean;
  videoGamePerformer: boolean;
  voicePerformer: boolean;
  voyPerformer: boolean;
}

interface Episodes {
  uid: string;
  title: string;
  titleGerman: string;
  titleItalian: null;
  titleJapanese: null;
  series: {
    uid: string;
    title: string;
  };
  season: {
    uid: string;
    title: string;
  };
  seasonNumber: number;
  episodeNumber: number;
  productionSerialNumber: string;
  featureLength: boolean;
  stardateFrom: number | null;
  stardateTo: number | null;
  yearFrom: number;
  yearTo: number;
  usAirDate: string;
  finalScriptDate: number | null;
}

interface Movies {
  uid: string;
  title: string;
  mainDirector: {
    uid: string;
    name: string;
  };
  titleBulgarian: string;
  titleCatalan: null;
  titleChineseTraditional: string;
  titleGerman: string;
  titleItalian: string;
  titleJapanese: string;
  titlePolish: string;
  titleRussian: string;
  titleSerbian: string;
  titleSpanish: string;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  usReleaseDate: string;
}

interface CharacterSpecies {
  uid: string;
  name: string;
  numerator: number;
  denominator: number;
}

interface CharacterRelations {
  type: string;
  source: {
    uid: string;
    name: string;
  };
  target: {
    uid: string;
    name: string;
  };
}

interface Occupations {
  uid: string;
  name: string;
  legalOccupation: boolean;
  medicalOccupation: boolean;
  scientificOccupation: boolean;
}

interface Organizations {
  uid: string;
  name: string;
  government: boolean;
  intergovernmentalOrganization: boolean;
  researchOrganization: boolean;
  sportOrganization: boolean;
  medicalOrganization: boolean;
  militaryOrganization: boolean;
  militaryUnit: boolean;
  governmentAgency: boolean;
  lawEnforcementAgency: boolean;
  prisonOrPenalColony: boolean;
  mirror: boolean;
  alternateReality: boolean;
}

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
  hologram: boolean;
  fictionalCharacter: boolean;
  mirror: boolean;
  alternateReality: boolean;
  performers: Performers[];
  episodes: Episodes[];
  movies: Movies[];
  characterSpecies: CharacterSpecies[];
  characterRelations: CharacterRelations[];
  titles: [[]];
  occupations: Occupations[];
  organizations: Organizations[];
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
