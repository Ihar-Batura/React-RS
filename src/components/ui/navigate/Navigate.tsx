import styles from './Navigate.module.scss';
import { useNavigate } from 'react-router';
import { useTheme } from '../../../shared/hooks/useTheme';

export const Navigate = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const changeTheme = () => {
    toggleTheme();
  };

  const handleGoAbout = () => {
    navigate('/about');
  };

  return (
    <nav className={`${styles.container} ${styles[theme]}`}>
      <ul className={styles.itemList}>
        <li className={styles.item} onClick={handleGoAbout}>
          About
        </li>
        <li className={styles.item} onClick={changeTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </li>
      </ul>
    </nav>
  );
};
