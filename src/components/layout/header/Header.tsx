import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.logo}>Star Trek</h1>
      </div>
    </header>
  );
};
