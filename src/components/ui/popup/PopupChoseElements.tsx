'use client';

import styles from './PopupChoseElements.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllItems } from '../../../store/selectedItemsSlice';
import { RootState } from '../../../store/store';
import { saveAs } from 'file-saver';
import { useTheme } from '../../../shared/hooks/useTheme';

export const PopupChoseElements = () => {
  const { theme } = useTheme();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const dispatch = useDispatch();

  const handleDownloadCSV = () => {
    const csvContent = selectedItems
      .map((item) => `${item.name} - "${item.description}"`)
      .join('\n');

    const blob = new Blob(['\uFEFF', csvContent], {
      type: 'text/csv;charset=utf-8',
    });

    saveAs(blob, `${selectedItems.length}_items.csv`);
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.title}>
        Selected {selectedItems.length} item
        {selectedItems.length > 1 ? 's' : ''}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => dispatch(removeAllItems())}
        >
          Unselect all
        </button>
        <button className={styles.button} onClick={handleDownloadCSV}>
          Download
        </button>
      </div>
    </div>
  );
};
