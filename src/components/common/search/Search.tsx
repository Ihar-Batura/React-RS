import styles from './Search.module.scss';
import { Component } from 'react';
import type { ReactNode } from 'react';
import getLastSearchTermFromLS from '../../../shared/ls/getLastSearchTermFormLS';
import setLastSearchTermToLS from '../../../shared/ls/setLastSearchTermToLS';

interface SearchProps {
  onSearch: (term: string) => void;
}

export class Search extends Component<SearchProps> {
  lastTerm = getLastSearchTermFromLS();
  state = {
    term: this.lastTerm ?? '',
  };

  handleTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      term: e.target.value,
    });
  };

  handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setLastSearchTermToLS(this.state.term);
    this.props.onSearch(this.state.term);
  };

  render(): ReactNode {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          value={this.state.term}
          onChange={this.handleTermChange}
        />
        <button className={styles.button} onClick={this.handleClickSearch}>
          Search
        </button>
      </div>
    );
  }
}
