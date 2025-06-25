import type { ReactNode } from 'react';
import { Component } from 'react';
import { HomePage } from './pages/home/HomePage';

export class App extends Component {
  render(): ReactNode {
    return (
      <>
        <HomePage />
      </>
    );
  }
}
