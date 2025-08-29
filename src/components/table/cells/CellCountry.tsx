import styles from '../Table.module.css';
import { memo } from 'react';

interface CellCountryComponentProps {
  countryName: string;
}

const CellCountryComponent = ({ countryName }: CellCountryComponentProps) => {
  return <td className={styles.tableRowCell}>{countryName}</td>;
};

export const CellCountry = memo(CellCountryComponent);
