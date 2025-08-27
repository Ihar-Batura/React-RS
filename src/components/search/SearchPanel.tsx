import styles from './SearchPanel.module.css';
import type { SortOption } from '../layout/Main';

interface SearchPanelProps {
  searchCountry: string;
  setSearchCountry: (value: string) => void;
  searchYear: number;
  setSearchYear: (value: number) => void;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
  availableYears: number[];
}

export const SearchPanel = ({
  searchCountry,
  setSearchCountry,
  searchYear,
  setSearchYear,
  sortOption,
  setSortOption,
  availableYears,
}: SearchPanelProps) => {
  return (
    <div className={styles.container}>
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

      <div className={styles.searchPanelItem}>
        <label htmlFor="select-year">Select Year:</label>
        <select
          className={styles.select}
          id="select-year"
          value={searchYear}
          onChange={(e) => setSearchYear(Number(e.target.value))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.searchPanelItem}>
        <label htmlFor="select-sort">Sort By:</label>
        <select
          className={styles.select}
          id="select-sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
        >
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="population_asc">Population (Low to High)</option>
          <option value="population_desc">Population (High to Low)</option>
        </select>
      </div>
    </div>
  );
};
