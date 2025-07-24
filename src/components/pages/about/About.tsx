'use client';

import styles from './About.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import ButtonGoBack from '../../ui/buttons/go-back';

export default function About() {
  const { theme } = useTheme();
  const t = useTranslations('About');

  return (
    <main className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <Image
          className={styles.picture}
          src="/react.jpg"
          alt="Logo React"
          width={100}
          height={100}
        />
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
        <ButtonGoBack />
      </div>
    </main>
  );
}
