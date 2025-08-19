import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.button}>Form 1</button>
        <button className={styles.button}>Form 2</button>
      </div>
    </header>
  );
};
