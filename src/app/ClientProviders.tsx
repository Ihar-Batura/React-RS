'use client';

import { ThemeProvider } from '../context/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Header } from '../components/layout/header/Header';
import { Footer } from '../components/layout/footer/Footer';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
