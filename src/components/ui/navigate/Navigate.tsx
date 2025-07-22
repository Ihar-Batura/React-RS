'use client';

import styles from './Navigate.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../../i18n/navigation';

export const Navigate = () => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Navigate');
  const currentLocale = useLocale();

  const pathname = usePathname();
  const router = useRouter();

  const changeTheme = () => {
    toggleTheme();
  };

  const changeLanguage = () => {
    router.replace(
      { pathname },
      { locale: currentLocale === 'en' ? 'ru' : 'en' }
    );
  };

  return (
    <nav className={`${styles.container} ${styles[theme]}`}>
      <ul className={styles.itemList}>
        <li className={styles.item}>
          <Link className={styles.link} href="/about">
            {t('btnAbout')}
          </Link>
        </li>
        <li className={styles.link} onClick={changeTheme}>
          {theme === 'light' ? t('btnThemeLight') : t('btnThemeDark')}
        </li>
        <li className={styles.link} onClick={changeLanguage}>
          {t('btnLang')}
        </li>
      </ul>
    </nav>
  );
};
