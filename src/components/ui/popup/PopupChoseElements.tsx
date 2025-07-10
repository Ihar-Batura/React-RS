import styles from './PopupChoseElements.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllItems } from '../../../store/selectedItemsSlice';
import { RootState } from '../../../store/store';

export const PopupChoseElements = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
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
