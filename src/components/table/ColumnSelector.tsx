import styles from './Table.module.css';
import { memo } from 'react';
import { columnOptions } from '../../constants/columnOptions';

interface ColumnSelectorComponentProps {
  visibleColumns: string[];
  toggleColumn: (key: string) => void;
}

const ColumnSelectorComponent = ({
  visibleColumns,
  toggleColumn,
}: ColumnSelectorComponentProps) => {
  return (
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
  );
};

export const ColumnSelector = memo(ColumnSelectorComponent);
