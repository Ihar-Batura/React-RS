import styles from '../Table.module.css';
import { memo } from 'react';

interface CellCo2ComponentProps {
  co2: string;
}

const CellCo2Component = ({ co2 }: CellCo2ComponentProps) => {
  return <td className={styles.tableRowCell}>{co2}</td>;
};

export const CellCo2 = memo(CellCo2Component);
