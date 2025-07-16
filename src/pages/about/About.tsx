'use client';

import styles from './About.module.scss';
import { useTheme } from '../../shared/hooks/useTheme';
import { useRouter } from 'next/navigation';

export const About = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            This project was developed as part of the React 2025 Q3 course by a
            goal-oriented and responsible Front-end developer with a fast
            learning pace and high motivation for development.
          </div>
          <div className={styles.title}>
            You can find out more information about the author by following the
            github link below.
          </div>
          <div className={styles.title}>
            If you want to see the course program, follow this{' '}
            <a
              className={styles.link}
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer noopener"
            >
              link.
            </a>
          </div>
        </div>
        <button className={styles.button} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </main>
  );
};
