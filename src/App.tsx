import { ErrorBoundary } from './shared/utils/error/ErrorBoundary';
import { Header } from './components/layout/header/Header';
import { SearchPage } from './pages/search/SearchPage';
import { Footer } from './components/layout/footer/Footer';
import { Route, Routes } from 'react-router';
import { AboutPage } from './pages/about/AboutPage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';

const HOME_PATH = '/';
const RESERVE_HOME_PATH = '/index.html';
const ABOUT_PATH = '/about';
const OTHER_PATH = '*';

export const App = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route path={HOME_PATH} element={<SearchPage />} />
        <Route path={RESERVE_HOME_PATH} element={<SearchPage />} />
        <Route path={ABOUT_PATH} element={<AboutPage />} />
        <Route path={OTHER_PATH} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
};
