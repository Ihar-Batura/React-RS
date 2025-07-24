'use client';

import styles from './About.module.scss';
import { useTheme } from '../../shared/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function About() {
  const { theme } = useTheme();
  const router = useRouter();
  const t = useTranslations('About');

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{t('firstTextTitle')}</div>
          <div className={styles.title}>{t('secondTextTitle')}</div>
          <div className={styles.title}>
            {t('linkTitle')}{' '}
            <Link
              className={styles.link}
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('linkText')}
            </Link>
          </div>
        </div>
        <button className={styles.button} onClick={handleGoBack}>
          {t('buttonText')}
        </button>
      </div>
    </main>
  );
}
