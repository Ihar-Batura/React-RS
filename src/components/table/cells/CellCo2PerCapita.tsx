import styles from '../Table.module.css';
import { memo } from 'react';

interface CellCo2PerCapitaComponentProps {
  co2PerCapita: string;
}

const CellCo2PerCapitaComponent = ({
  co2PerCapita,
}: CellCo2PerCapitaComponentProps) => {
  return <td className={styles.tableRowCell}>{co2PerCapita}</td>;
};

export const CellCo2PerCapita = memo(CellCo2PerCapitaComponent);
