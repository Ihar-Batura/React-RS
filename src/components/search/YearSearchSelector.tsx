import styles from './SearchPanel.module.css';
import { memo } from 'react';

interface YearSearchSelectorProps {
  searchYear: number;
  setSearchYear: (value: number) => void;
  availableYears: number[];
}

const YearSearchSelectorComponent = ({
  searchYear,
  setSearchYear,
  availableYears,
}: YearSearchSelectorProps) => {
  return (
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
  );
};

export const YearSearchSelector = memo(YearSearchSelectorComponent);
