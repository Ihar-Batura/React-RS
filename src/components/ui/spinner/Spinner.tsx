import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.container} role="status">
      <span className={styles.spinner} />
    </div>
  );
};
