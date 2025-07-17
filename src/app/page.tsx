'use client';

import { Header } from '../components/layout/header/Header';
import { Footer } from '../components/layout/footer/Footer';
import { SearchPageContent } from '../pages/search/SearchPageContent';

export default function SearchPage() {
  return (
    <>
      <Header />
      <SearchPageContent />
      <Footer />
    </>
  );
}
