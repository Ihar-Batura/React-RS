import styles from './Header.module.scss';
import { useNavigate } from 'react-router';

import { Navigate } from '../../ui/navigate/Navigate';

export const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.logo} onClick={handleGoHome}>
          Star Trek
        </h1>
        <Navigate />
      </div>
    </header>
  );
};
