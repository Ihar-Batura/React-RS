import styles from './Header.module.scss';
import { useNavigate } from 'react-router';
import { useTheme } from '../../../shared/hooks/useTheme';
import { Navigate } from '../../ui/navigate/Navigate';

export const Header = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <h1 className={styles.logo} onClick={handleGoHome}>
          Star Trek
        </h1>
        <Navigate />
      </div>
    </header>
  );
};
