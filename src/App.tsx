import type { ReactNode } from 'react';
import { Component } from 'react';
import { ErrorBoundary } from './shared/utils/error/ErrorBoundary';
import { Header } from './components/layout/header/Header';
import { SearchPage } from './pages/search/SearchPage';
import { Footer } from './components/layout/footer/Footer';

export class App extends Component {
  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          <Header />
          <SearchPage />
          <Footer />
        </ErrorBoundary>
      </>
    );
  }
}
