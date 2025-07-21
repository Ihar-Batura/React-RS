import { createRoot } from 'react-dom/client';
import './index.scss';
import { App } from './App.tsx';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
