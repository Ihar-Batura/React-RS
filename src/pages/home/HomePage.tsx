import type { ReactNode } from 'react';
import { Component } from 'react';
import { Header } from '../../components/layout/header/Header';
import { Main } from '../../components/layout/main/Main';
import { Footer } from '../../components/layout/footer/Footer';

export class HomePage extends Component {
  render(): ReactNode {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}
