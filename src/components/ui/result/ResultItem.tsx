import styles from './ResultItem.module.scss';
import { Component } from 'react';
import type { ReactNode } from 'react';
import { Character } from '../../../shared/types/types';

interface ResultItemProps {
  itemData: Character;
}

export class ResultItem extends Component<ResultItemProps> {
  render(): ReactNode {
    const descriptions = Object.entries(this.props.itemData).reduce(
      (acc, curr: [string, number | string | null | undefined]) => {
        if (curr[0] === 'name' || curr[0] === 'uid') return acc;
        return (
          acc +
          `${curr[0]}: ${curr[1] === undefined || curr[1] === null ? 'N/A' : curr[1]}, `
        );
      },
      ''
    );

    return (
      <li
        className={styles.container}
        onClick={() => {
          console.log(this.props.itemData.uid);
        }}
      >
        <p className={styles.name}>{this.props.itemData.name}</p>
        <p className={styles.description}>{descriptions}</p>
      </li>
    );
  }
}
