import styles from './SearchPanel.module.css';

export const SearchPanel = () => {
  const availableYears = [2022, 2023, 2024];
  return (
    <div className={styles.container}>
      <div className={styles.searchPanelItem}>
        <label htmlFor="search-country">Search Country:</label>
        <input
          className={styles.searchInput}
          id="search-country"
          type="text"
          placeholder="Enter country..."
        />
      </div>

      <div className={styles.searchPanelItem}>
        <label htmlFor="select-year">Select Year:</label>
        <select className={styles.select} id="select-year">
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.searchPanelItem}>
        <label htmlFor="select-sort">Sort By:</label>
        <select className={styles.select} id="select-sort">
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="population_asc">Population (Low to High)</option>
          <option value="population_desc">Population (High to Low)</option>
        </select>
      </div>
    </div>
  );
};
