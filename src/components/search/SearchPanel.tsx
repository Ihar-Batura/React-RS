import styles from './SearchPanel.module.css';
import type { SortOption } from '../layout/Main';
import { CountrySearchField } from './CountrySearchField';
import { YearSearchSelector } from './YearSearchSelector';
import { SortSearchSelector } from './SortSearchSelector';

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
      <CountrySearchField
        searchCountry={searchCountry}
        setSearchCountry={setSearchCountry}
      />

      <YearSearchSelector
        searchYear={searchYear}
        setSearchYear={setSearchYear}
        availableYears={availableYears}
      />

      <SortSearchSelector
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
};
