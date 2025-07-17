'use client';

import styles from './Search.module.scss';
import { useLocalStorageSearchTerm } from '../../../shared/hooks/useLocalStorageSearchTerm';
import setLastSearchTermToLS from '../../../shared/ls/setLastSearchTermToLS';
import { useTheme } from '../../../shared/hooks/useTheme';

interface SearchProps {
  onSearch: (term: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const { theme } = useTheme();

  const [term, setTerm] = useLocalStorageSearchTerm();

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTerm(e.target.value);
  };

  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setLastSearchTermToLS(term);
    onSearch(term);
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <input
        className={styles.input}
        value={term}
        placeholder="Enter character name"
        onChange={handleTermChange}
      />
      <button className={styles.button} onClick={handleClickSearch}>
        Search
      </button>
    </div>
  );
};
