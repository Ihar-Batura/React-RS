import styles from './AboutPage.module.scss';
import { useNavigate } from 'react-router';

export const AboutPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            This project was developed as part of the React 2025 Q3 course by a
            goal-oriented and responsible Front-end developer with a fast
            learning pace and high motivation for development.
          </div>
          <div className={styles.title}>
            You can find out more information about the author by following the
            github link below.
          </div>
          <div className={styles.title}>
            If you want to see the course program, follow this{' '}
            <a
              className={styles.link}
              href="https://rs.school/courses/reactjs"
              target="_blank"
            >
              link.
            </a>
          </div>
        </div>
        <button className={styles.button} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </main>
  );
};
