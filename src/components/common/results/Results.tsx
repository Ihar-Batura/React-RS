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
    if (isError) {
      return (
        <div className={styles.container}>
          <p className={styles.error}>
            Ooops! Error getting characters collection...
          </p>
        </div>
      );
    }
    if (!data || data.characters.length === 0) {
      return (
        <div className={styles.container}>
          <p>Nothing found!</p>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <ul className={styles.characterList}>
          {data.characters.map((character) => (
            <ResultItem key={character.uid} itemData={character} />
          ))}
        </ul>
      </div>
    );
  }
}
