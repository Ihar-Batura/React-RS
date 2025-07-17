'use client';

import styles from './ResultItem.module.scss';
import { Character } from '../../../shared/types/types';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../../store/selectedItemsSlice';
import { RootState } from '../../../store/store';
import { useTheme } from '../../../shared/hooks/useTheme';

interface ResultItemProps {
  itemData: Character;
  onSelect: () => void;
}

interface SelectedItem {
  id: string;
  name: string;
  description: string;
}

export const ResultItem = ({ itemData, onSelect }: ResultItemProps) => {
  const { theme } = useTheme();

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

  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );
  const isSelected = selectedItems.some(
    (item: SelectedItem) => item.id === itemData.uid
  );

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(removeItem({ id: itemData.uid }));
    } else {
      dispatch(
        addItem({
          id: itemData.uid,
          name: itemData.name,
          description: descriptions,
        })
      );
    }
  };

  return (
    <li className={`${styles.container} ${styles[theme]}`} onClick={onSelect}>
      <p className={styles.name}>{itemData.name}</p>
      <p className={styles.description}>{descriptions}</p>
      <input
        className={styles.flag}
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </li>
  );
};
