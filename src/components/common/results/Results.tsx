'use client';

import styles from './Results.module.scss';
import { CharactersResponse } from '../../../shared/types/types';
import { Spinner } from '../../ui/spinner/Spinner';
import { ResultItem } from '../../ui/result/ResultItem';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Results');

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      {data?.characters.length ? (
        <>
          <div className={styles.titleContainer}>
            <div className={styles.titleName}>{t('character')}:</div>
            <div className={styles.titleDescription}>{t('description')}:</div>
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
          {isError ? t('oopsText') : t('notFoundText')}
        </p>
      )}
    </div>
  );
};
