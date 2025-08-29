import styles from './Main.module.css';
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { CountryData } from '../../types/types';
import { useDataLoader } from '../../hooks/useDataLoader';
import { Table } from '../table/Table';
import { SearchPanel } from '../search/SearchPanel';

export type SortOption =
  | 'name_asc'
  | 'name_desc'
  | 'population_asc'
  | 'population_desc';

export const Main = () => {
  const data = useDataLoader();

  const [searchCountry, setSearchCountry] = useState('');
  const [searchYear, setSearchYear] = useState<number>(2023);
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  const handleSearchCountry = useCallback((value: string) => {
    setSearchCountry(value);
  }, []);

  const handleSearchYear = useCallback((value: number) => {
    setSearchYear(value);
  }, []);

  const handleSortOption = useCallback((value: SortOption) => {
    setSortOption(value);
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const allYears: number[] = [];
      Object.values(data).forEach((countryData: CountryData) => {
        countryData.data.forEach((item) => {
          if (!allYears.includes(item.year)) {
            allYears.push(item.year);
          }
        });
      });

      const sortedAllYears = allYears.sort((a, b) => b - a);
      setAvailableYears(sortedAllYears);

      if (sortedAllYears.length > 0) {
        setSearchYear(sortedAllYears[0]);
      }
    }
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    if (!data) return {};

    const filteredData = Object.entries(data).filter(([countryName]) =>
      countryName.toLowerCase().includes(searchCountry.toLowerCase())
    );

    if (sortOption !== 'name_asc') {
      filteredData.sort(([countryA, dataA], [countryB, dataB]) => {
        const yearDataA = dataA.data.find((item) => item.year === searchYear);
        const yearDataB = dataB.data.find((item) => item.year === searchYear);

        switch (sortOption) {
          case 'name_desc':
            return countryB.localeCompare(countryA);
          case 'population_asc':
            return (yearDataA?.population || 0) - (yearDataB?.population || 0);
          case 'population_desc':
            return (yearDataB?.population || 0) - (yearDataA?.population || 0);
          default:
            return 0;
        }
      });
    }

    return Object.fromEntries(filteredData);
  }, [data, searchCountry, searchYear, sortOption]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <SearchPanel
          searchCountry={searchCountry}
          setSearchCountry={handleSearchCountry}
          searchYear={searchYear}
          setSearchYear={handleSearchYear}
          sortOption={sortOption}
          setSortOption={handleSortOption}
          availableYears={availableYears}
        />
        <Table data={filteredAndSortedData} selectedYear={searchYear} />
      </div>
    </main>
  );
};
