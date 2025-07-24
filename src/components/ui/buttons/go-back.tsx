'use client';

import styles from './buttons.module.scss';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useTranslations } from 'next-intl';

export default function ButtonGoBack() {
  const { theme } = useTheme();
  const t = useTranslations('About');

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      className={`${styles.button} ${styles[theme]}`}
      onClick={handleGoBack}
      data-theme={theme}
    >
      {t('buttonText')}
    </button>
  );
}
