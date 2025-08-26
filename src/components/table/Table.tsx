import styles from './Table.module.css';

export const Table = () => {
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr className={styles.headerRow}>
          <th className={styles.headerTitle}>ISO</th>
          <th className={styles.headerTitle}>Country/Region</th>
          <th className={styles.headerTitle}>Year</th>
          <th className={styles.headerTitle}>Population</th>
          <th className={styles.headerTitle}>CO2</th>
          <th className={styles.headerTitle}>CO2 Per Capita</th>
        </tr>
      </thead>
    </table>
  );
};
