import { createRoot } from 'react-dom/client';
import './index.scss';
import { App } from './App.tsx';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider.tsx';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
