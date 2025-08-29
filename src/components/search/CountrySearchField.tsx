import styles from './SearchPanel.module.css';
import { memo } from 'react';

interface CountrySearchFieldProps {
  searchCountry: string;
  setSearchCountry: (value: string) => void;
}

const CountrySearchFieldComponent = ({
  searchCountry,
  setSearchCountry,
}: CountrySearchFieldProps) => {
  return (
    <div className={styles.searchPanelItem}>
      <label htmlFor="search-country" className={styles.label}>
        Search Country:
      </label>
      <input
        className={styles.searchInput}
        id="search-country"
        type="text"
        placeholder="Enter country..."
        value={searchCountry}
        onChange={(e) => setSearchCountry(e.target.value)}
      />
    </div>
  );
};

export const CountrySearchField = memo(CountrySearchFieldComponent);
