import styles from './Spinner.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';

export const Spinner = () => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.container} ${styles[theme]}`} role="status">
      <span className={styles.spinner} />
    </div>
  );
};
