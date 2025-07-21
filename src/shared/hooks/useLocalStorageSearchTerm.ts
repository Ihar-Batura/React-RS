import { useState } from 'react';
import getLastSearchTermFromLS from '../ls/getLastSearchTermFormLS';
import setLastSearchTermToLS from '../ls/setLastSearchTermToLS';

export const useLocalStorageSearchTerm = (): [
  string,
  (term: string) => void,
] => {
  const [term, setTerm] = useState<string>(getLastSearchTermFromLS() || '');

  const setSearchTerm = (term: string) => {
    setTerm(term);
    setLastSearchTermToLS(term);
  };

  return [term, setSearchTerm];
};
