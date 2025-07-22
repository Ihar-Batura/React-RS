'use client';

import styles from './Navigate.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '../../../i18n/navigation';
import { useSearchParams } from 'next/navigation';

export const Navigate = () => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Navigate');
  const currentLocale = useLocale();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeTheme = () => {
    toggleTheme();
  };

  const changeLanguage = () => {
    const queryParams = searchParams
      ? Object.fromEntries(searchParams.entries())
      : {};
    router.replace(
      { pathname, query: queryParams },
      { locale: currentLocale === 'en' ? 'ru' : 'en' }
    );
  };

  return (
    <nav className={`${styles.container} ${styles[theme]}`}>
      <ul className={styles.itemList}>
        <li className={styles.item}>
          <Link className={styles.link} href="/about">
            {' '}
            {t('btnAbout')}
          </Link>
        </li>
        <li className={styles.link} onClick={changeTheme}>
          {theme === 'light' ? t('btnThemeDark') : t('btnThemeLight')}
        </li>
        <li className={styles.link} onClick={changeLanguage}>
          {t('btnLang')}
        </li>
      </ul>
    </nav>
  );
};
