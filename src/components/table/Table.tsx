import styles from './Table.module.css';
import { useState, useMemo } from 'react';
import type { Data, CO2Data } from '../../types/types';

interface TableProps {
  data: Data;
  selectedYear: number;
}

const columnOptions = [
  { key: 'cement_co2', label: 'Cement CO₂' },
  { key: 'co2_growth_abs', label: 'CO₂ Growth Abs' },
  { key: 'co2_growth_prct', label: 'CO₂ Growth Prct.' },
  { key: 'co2_including_luc', label: 'CO₂ Including Luc' },
  {
    key: 'co2_including_luc_growth_abs',
    label: 'CO₂ Including Luc Growth Abs',
  },
  {
    key: 'co2_including_luc_growth_prct',
    label: 'CO₂  Including Luc Growth Prct',
  },
  {
    key: 'co2_including_luc_per_capita',
    label: 'CO₂ Including Luc Per Capita',
  },
  { key: 'coal_co2', label: 'Coal CO2' },
  { key: 'coal_co2_per_capita', label: 'Coal CO2 Per Capita' },
  { key: 'cumulative_cement_co2', label: 'Cumulative Cement CO2' },

  { key: 'cumulative_luc_co2', label: 'Cumulative Luc CO2' },
  { key: 'cumulative_co2', label: 'Cumulative CO2' },
  {
    key: 'cumulative_co2_including_luc',
    label: 'Cumulative CO2 Including Luc',
  },
  { key: 'cumulative_coal_co2', label: 'Cumulative Coal CO2' },
  { key: 'cumulative_gas_co2', label: 'Cumulative Gas CO2' },
  { key: 'cumulative_oil_co2', label: 'Cumulative Oil CO2' },
  { key: 'flaring_co2', label: 'Flaring CO2' },
  { key: 'flaring_co2_per_capita', label: 'Flaring CO2 Per Capita' },
  { key: 'gas_co2', label: 'Gas CO2' },
  { key: 'gas_co2_per_capita', label: 'Gas CO2 Per Capita' },
  {
    key: 'ghg_excluding_lucf_per_capita',
    label: 'Ghg Excluding Lucf Per Capita',
  },
  { key: 'ghg_per_capita', label: 'Ghg Per Capita' },
  { key: 'gdp', label: 'Gdp' },
  { key: 'land_use_change_co2', label: 'Land Use Change CO2' },
  {
    key: 'land_use_change_co2_per_capita',
    label: 'Land Use Change CO2 Per Capita',
  },
  { key: 'methane', label: 'Methane' },
  { key: 'methane_per_capita', label: 'Methane Per Capita' },
  { key: 'nitrous_oxide', label: 'Nitrous Oxide' },
  { key: 'nitrous_oxide_per_capita', label: 'Nitrous Oxide Per Capita' },
  { key: 'oil_co2', label: 'Oil CO2' },
  { key: 'oil_co2_per_capita', label: 'Oil CO2 Per Capita' },
] as const;

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

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Additional Columns:</h3>
      <div className={styles.selectorsContainer}>
        {columnOptions.map(({ key, label }) => (
          <label key={key} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(key)}
              onChange={() => toggleColumn(key)}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>{label}</span>
          </label>
        ))}
      </div>

      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.headerRow}>
            <th className={styles.headerTitle}>ISO</th>
            <th className={styles.headerTitle}>Country</th>
            <th className={styles.headerTitle}>Year</th>
            <th className={styles.headerTitle}>Population</th>
            <th className={styles.headerTitle}>CO2</th>
            <th className={styles.headerTitle}>CO2 Per Capita</th>
            {visibleColumns.map((key) => (
              <th key={key} className={styles.headerTitle}>
                {columnOptions.find((c) => c.key === key)?.label || key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((allCountryData, index) => (
            <tr
              key={index + allCountryData.country}
              className={styles.tableRow}
            >
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
