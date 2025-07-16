'use client';

import styles from './not-found/NotFoundPage.module.scss';
import { useTheme } from '../shared/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { Header } from '../components/layout/header/Header';
import { Footer } from '../components/layout/footer/Footer';

export default function NotFoundPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
