'use client';

import styles from './buttons.module.scss';
import { useRouter } from 'next/navigation';

export default function ButtonGoBack() {
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
