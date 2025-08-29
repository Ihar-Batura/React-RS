import styles from './SearchPanel.module.css';
import type { SortOption } from '../layout/Main';
import { memo } from 'react';

interface SortSearchSelectorProps {
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
}

const SortSearchSelectorComponent = ({
  sortOption,
  setSortOption,
}: SortSearchSelectorProps) => {
  return (
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
  );
};

export const SortSearchSelector = memo(SortSearchSelectorComponent);
