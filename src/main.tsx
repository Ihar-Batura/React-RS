import { createRoot } from 'react-dom/client';
import './index.scss';
import { App } from './App.tsx';
import { ErrorBoundary } from './shared/utils/error/ErrorBoundary.tsx';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
