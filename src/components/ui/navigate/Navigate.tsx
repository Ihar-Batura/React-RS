'use client';

import styles from './Navigate.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';
import Link from 'next/link';

export const Navigate = () => {
  const { theme, toggleTheme } = useTheme();

  const changeTheme = () => {
    toggleTheme();
  };

  return (
    <nav className={`${styles.container} ${styles[theme]}`}>
      <ul className={styles.itemList}>
        <li className={styles.item}>
          <Link className={styles.link} href="/about">
            About
          </Link>
        </li>
        <li className={styles.link} onClick={changeTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </li>
      </ul>
    </nav>
  );
};
