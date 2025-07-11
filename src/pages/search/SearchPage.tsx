import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import styles from './SearchPage.module.scss';
import { Search } from '../../components/common/search/Search';
import { Results } from '../../components/common/results/Results';
import apiSearchCharacters from '../../shared/api/apiSearchCharacters';
import { CharactersResponse, Character } from '../../shared/types/types';
import { useLocalStorageSearchTerm } from '../../shared/hooks/useLocalStorageSearchTerm';
import { Pagination } from '../../components/common/pagination/Pagination';
import apiGetCharacterData from '../../shared/api/apiGetCharacterData';
import { Spinner } from '../../components/ui/spinner/Spinner';
import { CharacterDetails } from '../../components/ui/character/CharacterDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PopupChoseElements } from '../../components/ui/popup/PopupChoseElements';
import { useTheme } from '../../shared/hooks/useTheme';

export const SearchPage = () => {
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useLocalStorageSearchTerm();
  const [searchResults, setSearchResults] = useState<CharactersResponse | null>(
    null
  );
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [detailsData, setDetailsData] = useState<Character | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;
  const detailsUidFromUrl = searchParams.get('details');

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

  useEffect(() => {
    if (!detailsUidFromUrl) {
      setDetailsData(null);
      return;
    }

    const fetchDetails = async () => {
      setDetailsLoading(true);

      try {
        const data = await apiGetCharacterData(detailsUidFromUrl);
        setDetailsData(data);
      } catch (error) {
        console.error('Failed to load character details', error);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [detailsUidFromUrl]);

  const handleSelectCharacter = (uid: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('details', uid);
    navigate(`?${newSearchParams.toString()}`);
  };

  const handleCloseDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    navigate(`?${newSearchParams.toString()}`);
    setDetailsData(null);
  };

  const handleSearch = (term: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', '1');
    newSearchParams.delete('details');
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    newSearchParams.delete('details');
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  return (
    <main className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.searchSection}>
          <Search onSearch={handleSearch} />
          <Results
            data={searchResults}
            isError={searchError}
            isLoading={isLoading}
            onSelectCharacter={handleSelectCharacter}
          />
          {searchResults?.page?.totalPages &&
            searchResults.page.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={searchResults.page.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          {selectedItems.length > 0 && <PopupChoseElements />}
        </div>
        {detailsUidFromUrl && (
          <div className={styles.detailsSection}>
            <button className={styles.closeButton} onClick={handleCloseDetails}>
              &times;
            </button>
            {detailsLoading ? (
              <Spinner />
            ) : (
              <CharacterDetails character={detailsData} />
            )}
          </div>
        )}
      </div>
    </main>
  );
};
