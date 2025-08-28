import styles from './Table.module.css';
import { useState, useMemo, useCallback } from 'react';
import type { Data, CO2Data } from '../../types/types';
import { ColumnSelector } from './ColumnSelector';
import { TableHead } from './TableHead';

interface TableProps {
  data: Data;
  selectedYear: number;
}

export const Table = ({ data, selectedYear }: TableProps) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  const tableData = useMemo(() => {
    return Object.entries(data).map(([countryName, countryData]) => {
      const yearData = countryData.data.find(
        (item) => item.year === selectedYear
      );

      return {
        iso: countryData.iso_code,
        country: countryName,
        year: selectedYear,
        population: yearData?.population,
        co2: yearData?.co2,
        co2_per_capita: yearData?.co2_per_capita,
        details: yearData,
      };
    });
  }, [data, selectedYear]);

  const formatValue = (
    value: number | undefined,
    isLargeNumber: boolean = false
  ): string => {
    if (value == null) return 'N/A';
    return isLargeNumber ? value.toLocaleString() : value.toFixed(5);
  };

  const toggleColumn = useCallback((key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Additional Columns:</h3>
      <ColumnSelector
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
      />

      <table className={styles.table}>
        <TableHead visibleColumns={visibleColumns} />
        <tbody>
          {tableData.map((allCountryData) => (
            <tr key={allCountryData.country} className={styles.tableRow}>
              <td className={styles.tableRowCell}>
                {allCountryData.iso || 'N/A'}
              </td>
              <td className={styles.tableRowCell}>{allCountryData.country}</td>
              <td className={styles.tableRowCell}>{allCountryData.year}</td>
              <td className={styles.tableRowCell}>
                {formatValue(allCountryData.population, true)}
              </td>
              <td className={styles.tableRowCell}>
                {formatValue(allCountryData.co2)}
              </td>
              <td className={styles.tableRowCell}>
                {formatValue(allCountryData.co2_per_capita)}
              </td>
              {visibleColumns.map((key) => (
                <td key={key} className={styles.tableRowCell}>
                  {formatValue(allCountryData.details?.[key as keyof CO2Data])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
