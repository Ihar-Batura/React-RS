import { useState, useEffect } from 'react';
import styles from './SearchPage.module.scss';
import { Search } from '../../components/common/search/Search';
import { Results } from '../../components/common/results/Results';
import apiSearchCharacters from '../../shared/api/apiSearchCharacters';
import { CharactersResponse } from '../../shared/types/types';
import { useLocalStorageSearchTerm } from '../../shared/hooks/useLocalStorageSearchTerm';
import { Pagination } from '../../components/common/pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorageSearchTerm();
  const [searchResults, setSearchResults] = useState<CharactersResponse | null>(
    null
  );
  const [searchError, setSearchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPageFromUrl = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  useEffect(() => {
    const newPage = Number(searchParams.get('page')) || 1;
    setCurrentPage(newPage);
  }, [searchParams]);

  useEffect(() => {
    if (currentPage !== currentPageFromUrl) {
      searchParams.set('page', currentPage.toString());
      navigate(`?${searchParams.toString()}`, { replace: true });
    }
  }, [currentPage, currentPageFromUrl, navigate, searchParams]);

  useEffect(() => {
    handleSearch(searchTerm, currentPage);
  }, [currentPage]);

  const handleSearch = async (term: string, page: number): Promise<void> => {
    setIsLoading(true);
    setSearchError(false);
    try {
      const actualPage = searchTerm !== term ? 1 : page;

      const results = await apiSearchCharacters(term.trim(), actualPage - 1);

      setSearchTerm(term);
      setSearchResults(results);
      setSearchError(false);

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', actualPage.toString());
      navigate(`?${newSearchParams.toString()}`, { replace: true });
    } catch (error) {
      console.error('Failed to fetch characters:', error);
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Search onSearch={(term) => handleSearch(term, 1)} />
        <Results
          data={searchResults}
          isError={searchError}
          isLoading={isLoading}
        />
        {searchResults?.page.totalPages &&
          searchResults.page.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={searchResults.page.totalPages}
              onPageChange={setCurrentPage}
            />
          )}
      </div>
    </main>
  );
};
