import styles from './ResultItem.module.scss';
import { Character } from '../../../shared/types/types';

interface ResultItemProps {
  itemData: Character;
  onSelect: () => void;
}

export const ResultItem = ({ itemData, onSelect }: ResultItemProps) => {
  const descriptions = Object.entries(itemData).reduce(
    (acc, curr: [string, number | string | null | undefined]) => {
      if (curr[0] === 'name' || curr[0] === 'uid') return acc;
      return (
        acc +
        `${curr[0]}: ${curr[1] === undefined || curr[1] === null ? 'N/A' : curr[1]}, `
      );
    },
    ''
  );

  return (
    <li className={styles.container} onClick={onSelect}>
      <p className={styles.name}>{itemData.name}</p>
      <p className={styles.description}>{descriptions}</p>
    </li>
  );
};
