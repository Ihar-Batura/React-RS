'use client';

import styles from './buttons.module.scss';
import Link from 'next/link';

export default function ButtonGoHome() {
  return (
    <Link href="/">
      <button className={styles.button}>Go Home</button>
    </Link>
  );
}
