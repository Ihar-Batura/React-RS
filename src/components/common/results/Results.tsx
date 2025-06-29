import styles from './Results.module.scss';
import { Component } from 'react';
import type { ReactNode } from 'react';
import { CharactersResponse } from '../../../shared/types/types';
import { Spinner } from '../../ui/spinner/Spinner';
import { ResultItem } from '../../ui/result/ResultItem';

interface ResultsProps {
  data: CharactersResponse | null;
  isError: boolean;
  isLoading: boolean;
}

export class Results extends Component<ResultsProps> {
  render(): ReactNode {
    const { isError, data, isLoading } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div className={styles.container}>
        {data?.characters.length ? (
          <>
            <div className={styles.titleContainer}>
              <div className={styles.titleName}>Character:</div>
              <div className={styles.titleDescription}>Description:</div>
            </div>
            <ul className={styles.characterList}>
              {data.characters.map((character) => (
                <ResultItem key={character.uid} itemData={character} />
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
  }
}
