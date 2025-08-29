import styles from '../Table.module.css';
import { memo } from 'react';

interface CellYearComponentProps {
  year: number;
}

const CellYearComponent = ({ year }: CellYearComponentProps) => {
  return <td className={styles.tableRowCell}>{year}</td>;
};

export const CellYear = memo(CellYearComponent);
