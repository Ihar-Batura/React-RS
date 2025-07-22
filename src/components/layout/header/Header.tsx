import styles from './Header.module.scss';

import { useTheme } from '../../../shared/hooks/useTheme';
import { Navigate } from '../../ui/navigate/Navigate';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Header = () => {
  const { theme } = useTheme();
  const t = useTranslations('Header');

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <h1>
          <Link className={styles.logo} href="/">
            {t('logo')}
          </Link>
        </h1>
        <Navigate />
      </div>
    </header>
  );
};
