import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import styles from './SearchPage.module.scss';
import { Search } from '../../components/common/search/Search';
import { Results } from '../../components/common/results/Results';
import apiSearchCharacters from '../../shared/api/apiSearchCharacters';
import { CharactersResponse } from '../../shared/types/types';
import { useLocalStorageSearchTerm } from '../../shared/hooks/useLocalStorageSearchTerm';
import { Pagination } from '../../components/common/pagination/Pagination';

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorageSearchTerm();
  const [searchResults, setSearchResults] = useState<CharactersResponse | null>(
    null
  );
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await apiSearchCharacters(
          searchTerm.trim(),
          currentPage - 1
        );
        setSearchResults(results);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        setSearchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, currentPage]);

  const handleSearch = (term: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', '1');
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Search onSearch={handleSearch} />
        <Results
          data={searchResults}
          isError={searchError}
          isLoading={isLoading}
        />
        {searchResults?.page?.totalPages &&
          searchResults.page.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={searchResults.page.totalPages}
              onPageChange={handlePageChange}
            />
          )}
      </div>
    </main>
  );
};
