import styles from './Navigate.module.scss';
import { useNavigate } from 'react-router';

export const Navigate = () => {
  const navigate = useNavigate();

  const handleGoAbout = () => {
    navigate('/about');
  };

  return (
    <nav className={styles.container}>
      <ul className={styles.itemList}>
        <li className={styles.item} onClick={handleGoAbout}>
          About
        </li>
      </ul>
    </nav>
  );
};
