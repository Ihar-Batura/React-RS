import styles from './Footer.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const { theme } = useTheme();
  const t = useTranslations('Footer');

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <p className={styles.year}>{`© ${new Date().getFullYear()}`}</p>
        <a
          className={styles.link}
          href="https://github.com/Ihar-Batura"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('author')}
        </a>
      </div>
    </footer>
  );
};
