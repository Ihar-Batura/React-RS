'use client';

import styles from './Results.module.scss';
import { CharactersResponse } from '../../../shared/types/types';
import { Spinner } from '../../ui/spinner/Spinner';
import { ResultItem } from '../../ui/result/ResultItem';
import { useTheme } from '../../../shared/hooks/useTheme';

interface ResultsProps {
  data: CharactersResponse | null;
  isError: boolean;
  isLoading: boolean;
  onSelectCharacter: (uid: string) => void;
}

export const Results = ({
  data,
  isError,
  isLoading,
  onSelectCharacter,
}: ResultsProps) => {
  const { theme } = useTheme();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      {data?.characters.length ? (
        <>
          <div className={styles.titleContainer}>
            <div className={styles.titleName}>Character:</div>
            <div className={styles.titleDescription}>Description:</div>
          </div>
          <ul className={styles.characterList}>
            {data.characters.map((character) => (
              <ResultItem
                key={character.uid}
                itemData={character}
                onSelect={() => onSelectCharacter(character.uid)}
              />
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.message}>
          {isError
            ? 'Ooops! Error getting characters collection...'
            : 'Nothing found!'}
        </p>
      )}
    </div>
  );
};
