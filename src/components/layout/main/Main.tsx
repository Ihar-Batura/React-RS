import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './Main.module.scss';
import { Search } from '../../common/search/Search';
import { Results } from '../../common/results/Results';
import { apiGetCharacters } from '../../../shared/api/apiGetCharacters';
import { LocalStorageService } from '../../../shared/ls/localStorageService';
import { CharactersResponse } from '../../../shared/types/types';

interface MainState {
  searchTerm: string;
  searchResults: CharactersResponse | null;
  searchError: boolean;
  isLoading: boolean;
  hasTestError: boolean;
}

export class Main extends Component {
  storageService = new LocalStorageService();

  state: MainState = {
    searchTerm: '',
    searchResults: null,
    searchError: false,
    isLoading: false,
    hasTestError: false,
  };

  async componentDidMount() {
    const lastTerm = this.storageService.getLastSearchTerm();
    if (lastTerm) {
      this.setState({ isLoading: true });
      try {
        const results = await apiGetCharacters(lastTerm.trim());
        this.setState({
          searchTerm: lastTerm,
          searchResults: results,
        });
      } catch (error) {
        console.error('Failed to fetch characters on mount:', error);
        this.setState({ searchError: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = async (term: string) => {
    this.setState({ isLoading: true });
    try {
      const results = await apiGetCharacters(term.trim());
      this.setState({
        searchResults: results,
        searchTerm: term,
      });
    } catch (error) {
      console.error('Failed to fetch characters:', error);
      this.setState({ searchError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  throwTestError = () => {
    this.setState({
      hasTestError: true,
    });
  };

  render(): ReactNode {
    if (this.state.hasTestError) {
      throw new Error("Don't worry this a test error");
    }
    return (
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <Search onSearch={this.handleSearch} />
          <Results
            data={this.state.searchResults}
            isError={this.state.searchError}
            isLoading={this.state.isLoading}
          />
          <button onClick={this.throwTestError}>Error Button</button>
        </div>
      </main>
    );
  }
}
