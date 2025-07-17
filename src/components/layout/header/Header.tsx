import styles from './Header.module.scss';

import { useTheme } from '../../../shared/hooks/useTheme';
import { Navigate } from '../../ui/navigate/Navigate';
import Link from 'next/link';

export const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <h1>
          <Link className={styles.logo} href="/">
            Star Trek
          </Link>
        </h1>
        <Navigate />
      </div>
    </header>
  );
};
