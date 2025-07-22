'use client';

import styles from './PopupChoseElements.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllItems } from '../../../store/selectedItemsSlice';
import { RootState } from '../../../store/store';
import { saveAs } from 'file-saver';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useTranslations } from 'next-intl';

export const PopupChoseElements = () => {
  const { theme } = useTheme();
  const t = useTranslations('PopupChoseElements');
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
        {t('title')} {selectedItems.length} {t('value')}
        {selectedItems.length > 1 ? t('endingValue') : ''}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => dispatch(removeAllItems())}
        >
          {t('buttonUnselectText')}
        </button>
        <button className={styles.button} onClick={handleDownloadCSV}>
          {t('buttonDownloadText')}
        </button>
      </div>
    </div>
  );
};
