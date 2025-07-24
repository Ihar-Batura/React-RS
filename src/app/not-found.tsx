'use server';

import styles from '../assets/styles/NotFoundPage.module.scss';
import ButtonGoHome from '../components/ui/buttons/go-home';
import ButtonGoBack from '../components/ui/buttons/go-back';

export default async function NotFoundPage() {
  return (
    <main className={`${styles.container} `}>
      <div className={styles.wrapper}>
        <h2 className={styles.number}>404</h2>
        <div className={styles.title}>This page doesn’t exist</div>
        <div className={styles.buttonsContainer}>
          <ButtonGoHome />
          <ButtonGoBack />
        </div>
      </div>
    </main>
  );
}
