import styles from './Footer.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';

export const Footer = () => {
  const { theme } = useTheme();

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
          Ihar Batura
        </a>
      </div>
    </footer>
  );
};
