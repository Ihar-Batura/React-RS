import styles from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.spinner} />
      <div className={styles.spinnerText}>Loading...</div>
    </div>
  );
};
