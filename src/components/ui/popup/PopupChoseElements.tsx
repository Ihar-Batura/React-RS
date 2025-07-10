import styles from './PopupChoseElements.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export const PopupChoseElements = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Selected {selectedItems.length} item
        {selectedItems.length > 1 ? 's' : ''}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => console.log('Unselect all')}
        >
          Unselect all
        </button>
        <button
          className={styles.button}
          onClick={() => console.log('Download')}
        >
          Download
        </button>
      </div>
    </div>
  );
};
