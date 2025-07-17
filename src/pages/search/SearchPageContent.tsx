'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import styles from './SearchPageContent.module.scss';
import { Search } from '../../components/common/search/Search';
import { Results } from '../../components/common/results/Results';
import { useLocalStorageSearchTerm } from '../../shared/hooks/useLocalStorageSearchTerm';
import { Pagination } from '../../components/common/pagination/Pagination';
import { Spinner } from '../../components/ui/spinner/Spinner';
import { CharacterDetails } from '../../components/ui/character/CharacterDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PopupChoseElements } from '../../components/ui/popup/PopupChoseElements';
import { useTheme } from '../../shared/hooks/useTheme';
import { useGetCharacterByUidQuery } from '../../store/apiSlice';
import { useSearchCharactersQuery } from '../../store/apiSlice';

export const SearchPageContent = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useLocalStorageSearchTerm();

  const params = new URLSearchParams(searchParams?.toString());
  const currentPage = Number(params.get('page')) || 1;
  const detailsUidFromUrl = params.get('details');

  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
    refetch: refetchSearchResults,
  } = useSearchCharactersQuery({
    term: searchTerm.trim(),
    page: currentPage - 1,
  });

  const {
    data: detailsData,
    isLoading: detailsLoading,
    isError: detailsError,
    refetch: refetchDetailsData,
  } = useGetCharacterByUidQuery(detailsUidFromUrl || '', {
    skip: !detailsUidFromUrl,
  });

  const handleSelectCharacter = (uid: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.set('details', uid);
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleCloseDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.delete('details');
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleSearch = (term: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.set('page', '1');
    newSearchParams.delete('details');
    router.replace(`?${newSearchParams.toString()}`);
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.set('page', page.toString());
    newSearchParams.delete('details');
    router.replace(`?${newSearchParams.toString()}`);
  };

  const handleForceRefresh = () => {
    refetchSearchResults();
    if (detailsUidFromUrl) {
      refetchDetailsData();
    }
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
            data={searchResults ?? null}
            isError={searchError}
            isLoading={searchLoading}
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
          {searchResults?.page?.totalPages && (
            <button
              className={styles.refreshButton}
              onClick={handleForceRefresh}
            >
              Force Refresh
            </button>
          )}
        </div>
        {detailsUidFromUrl && (
          <div className={styles.detailsSection}>
            <button className={styles.closeButton} onClick={handleCloseDetails}>
              &times;
            </button>
            {detailsLoading ? (
              <Spinner />
            ) : detailsError ? (
              <div>Error loading character details</div>
            ) : (
              <CharacterDetails character={detailsData ?? null} />
            )}
          </div>
        )}
      </div>
    </main>
  );
};
