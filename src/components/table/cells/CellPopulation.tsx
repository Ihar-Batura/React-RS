import styles from '../Table.module.css';
import { memo } from 'react';

interface CellPopulationComponentProps {
  population: string;
}

const CellPopulationComponent = ({
  population,
}: CellPopulationComponentProps) => {
  return <td className={styles.tableRowCell}>{population}</td>;
};

export const CellPopulation = memo(CellPopulationComponent);
