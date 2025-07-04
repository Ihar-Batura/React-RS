import styles from './Search.module.scss';
import { useState } from 'react';
import getLastSearchTermFromLS from '../../../shared/ls/getLastSearchTermFormLS';
import setLastSearchTermToLS from '../../../shared/ls/setLastSearchTermToLS';

interface SearchProps {
  onSearch: (term: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [term, setTerm] = useState<string>(getLastSearchTermFromLS() || '');

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTerm(e.target.value);
  };

  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setLastSearchTermToLS(term);
    onSearch(term);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={term}
        onChange={handleTermChange}
      />
      <button className={styles.button} onClick={handleClickSearch}>
        Search
      </button>
    </div>
  );
};
