import { useState, useEffect } from 'react';
import styles from './SearchPage.module.scss';
import { Search } from '../../components/common/search/Search';
import { Results } from '../../components/common/results/Results';
import apiSearchCharacters from '../../shared/api/apiSearchCharacters';
import { CharactersResponse } from '../../shared/types/types';
import { useLocalStorageSearchTerm } from '../../shared/hooks/useLocalStorageSearchTerm';

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorageSearchTerm();
  const [searchResults, setSearchResults] = useState<CharactersResponse | null>(
    null
  );
  const [searchError, setSearchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasTestError, setHasTestError] = useState<boolean>(false);

  useEffect(() => {
    handleSearch(searchTerm);
  }, []);

  const handleSearch = async (term: string): Promise<void> => {
    setIsLoading(true);
    setSearchError(false);
    try {
      const results = await apiSearchCharacters(term.trim());
      setSearchTerm(term);
      setSearchResults(results);
      setSearchError(false);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const throwTestError = (): void => {
    setHasTestError(true);
  };

  if (hasTestError) {
    throw new Error("Don't worry this a test error");
  }
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Search onSearch={handleSearch} />
        <Results
          data={searchResults}
          isError={searchError}
          isLoading={isLoading}
        />
        <button className={styles.button} onClick={throwTestError}>
          Error Button
        </button>
      </div>
    </main>
  );
};
