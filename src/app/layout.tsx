'use client';

import './globals.scss';
import { ThemeProvider } from '../context/ThemeProvider';
import { ErrorBoundary } from '../shared/utils/error/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Star Trek</title>
        <meta name="description" content="Star Trek application" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/star-trek-logo.svg" />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
