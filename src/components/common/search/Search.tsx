import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './Search.module.scss';
import { LocalStorageService } from '../../../shared/ls/localStorageService';

export class Search extends Component {
  state = {
    term: '',
  };

  storageService = new LocalStorageService();

  constructor(props: object) {
    super(props);

    const lastTerm = this.storageService.getLastSearchTerm();
    if (lastTerm) {
      this.state = {
        term: lastTerm,
      };
    }
  }

  handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      term: e.target.value,
    });
  };

  handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.storageService.setLastSearchTerm(this.state.term);
  };

  render(): ReactNode {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          value={this.state.term}
          onChange={this.handleTermChange}
        ></input>
        <button className={styles.button} onClick={this.handleClickSearch}>
          Search
        </button>
        <p>My search: {this.state.term}.</p>
      </div>
    );
  }
}
