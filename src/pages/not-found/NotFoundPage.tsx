import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router';
import { useTheme } from '../../shared/hooks/useTheme';

export const NotFoundPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <h2 className={styles.number}>404</h2>
        <div className={styles.title}>This page doesn’t exist</div>
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={handleGoHome}>
            Go Home
          </button>
          <button className={styles.button} onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
};
