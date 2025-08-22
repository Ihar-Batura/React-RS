import styles from './Main.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

export const Main = () => {
  const formEntries = useSelector(
    (state: RootState) => state.forms.formEntries
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {formEntries.length === 0 ? (
          <p className={styles.emptyMessage}>
            No form data yet! Submit a form to see entries!
          </p>
        ) : (
          formEntries.map((entry, index) => (
            <div
              key={index + entry.name}
              className={`${styles.profileContainer} ${index === formEntries.length - 1 ? styles.lastProfile : ''}`}
            >
              <h3 className={styles.profileName}>{entry.name}</h3>
              <div className={styles.profileInfo}>Age: {entry.age}</div>
              <div className={styles.profileInfo}>Email: {entry.email}</div>
              <div className={styles.profileInfo}>
                Password: {entry.password}
              </div>
              <div className={styles.profileInfo}>Gender: {entry.gender}</div>
              <div className={styles.profileInfo}>
                Accepted Terms: {entry.acceptedTerms ? 'Yes' : 'No'}
              </div>
              <div className={styles.profileInfo}>Country: {entry.country}</div>
              {entry.profilePicture && (
                <img
                  src={entry.profilePicture}
                  alt="Profile Picture"
                  className={styles.profilePicture}
                />
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
};
