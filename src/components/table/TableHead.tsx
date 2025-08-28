import styles from './Table.module.css';
import { memo } from 'react';
import { columnOptions } from '../../constants/columnOptions';

interface TableHeadComponentProps {
  visibleColumns: string[];
}

const TableHeadComponent = ({ visibleColumns }: TableHeadComponentProps) => {
  return (
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
  );
};

export const TableHead = memo(TableHeadComponent);
