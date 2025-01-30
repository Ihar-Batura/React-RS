import type { ReactNode } from 'react';
import { Component } from 'react';
import { Header } from '../header/Header';
import { Main } from '../main/Main';
import { Footer } from '../footer/Footer';

export class HomePage extends Component {
  render(): ReactNode {
    return (
      <>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </>
    );
  }
}
