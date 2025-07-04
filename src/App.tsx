import { ErrorBoundary } from './shared/utils/error/ErrorBoundary';
import { Header } from './components/layout/header/Header';
import { SearchPage } from './pages/search/SearchPage';
import { Footer } from './components/layout/footer/Footer';

export const App = () => {
  return (
    <ErrorBoundary>
      <Header />
      <SearchPage />
      <Footer />
    </ErrorBoundary>
  );
};
