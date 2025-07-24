'use client';

import styles from './buttons.module.scss';
import { useRouter } from 'next/navigation';

export default function ButtonGoBackForNotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button className={styles.button} onClick={handleGoBack}>
      Go Back
    </button>
  );
}
