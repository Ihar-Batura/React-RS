import styles from '../Table.module.css';
import { memo } from 'react';

interface CellIsoComponentProps {
  iso: string;
}

const CellIsoComponent = ({ iso }: CellIsoComponentProps) => {
  return <td className={styles.tableRowCell}>{iso}</td>;
};

export const CellIso = memo(CellIsoComponent);
