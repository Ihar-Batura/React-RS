'use client';

import styles from './CharacterDetails.module.scss';
import { Character } from '../../../shared/types/types';
import { useTheme } from '../../../shared/hooks/useTheme';

interface CharacterDetailsProps {
  character: Character | null;
}

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  const { theme } = useTheme();

  if (!character)
    return (
      <p className={`${styles.title} ${styles[theme]}`}>
        Character information with this UID not found!
      </p>
    );

  return (
    <div className={`${styles.container} ${styles[theme]}`} role="container">
      <h2 className={styles.title}>Character Information:</h2>
      <section className={styles.section} data-testid="character-section">
        <h3 className={styles.littleTitle}>Performers:</h3>
        {character.performers?.length ? (
          <ul className={styles.description}>
            {character.performers.map((performer) => (
              <li key={performer.uid}>{performer.name}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.description}>
            No performer information available.
          </p>
        )}
      </section>

      <section className={styles.section} data-testid="character-section">
        <h3 className={styles.littleTitle}>Episodes:</h3>
        {character.episodes?.length ? (
          <ul className={styles.description}>
            {character.episodes.map((episode) => (
              <li key={episode.uid}>
                {episode.title} ({episode.series.title}, S{episode.seasonNumber}
                E{episode.episodeNumber})
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.description}>
            This character does not appear in any episodes.
          </p>
        )}
      </section>

      <section className={styles.section} data-testid="character-section">
        <h3 className={styles.littleTitle}>Movies:</h3>
        {character.movies?.length ? (
          <ul className={styles.description}>
            {character.movies.map((movie) => (
              <li key={movie.uid} className={styles.movieItem}>
                <strong>{movie.title}</strong> ({movie.yearFrom})
                {movie.mainDirector && (
                  <p>Director: {movie.mainDirector.name}</p>
                )}
                {movie.stardateFrom && movie.stardateTo && (
                  <p>
                    Start dates: {movie.stardateFrom}–{movie.stardateTo}
                  </p>
                )}
                {movie.usReleaseDate && (
                  <p>US Release Date: {movie.usReleaseDate}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.description}>
            This character does not appear in any movies.
          </p>
        )}
      </section>

      <section className={styles.section} data-testid="character-section">
        <h3 className={styles.littleTitle}>Occupations:</h3>
        {character.occupations?.length ? (
          <ul className={styles.description}>
            {character.occupations.map((occupation) => (
              <li key={occupation.uid}>{occupation.name}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.description}>No occupations found.</p>
        )}
      </section>

      <section className={styles.section} data-testid="character-section">
        <h3 className={styles.littleTitle}>Species:</h3>
        {character.characterSpecies?.length ? (
          <ul className={styles.description}>
            {character.characterSpecies.map((species) => (
              <li key={species.uid} className={styles.speciesItem}>
                {species.name} —{' '}
                {species.denominator > 1
                  ? `${species.numerator}/${species.denominator}`
                  : 'Pure'}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.description}>
            No species information available.
          </p>
        )}
      </section>

      <section className={styles.section} data-testid="character-section">
        <h3 className={styles.littleTitle}>Organizations:</h3>
        {character.organizations?.length ? (
          <ul className={styles.description}>
            {character.organizations.map((org) => (
              <li key={org.uid} className={styles.orgItem}>
                <strong>{org.name}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.description}>
            This character is not affiliated with any organizations.
          </p>
        )}
      </section>
    </div>
  );
};
