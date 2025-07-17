'use client';

import React from 'react';
import styles from './ErrorBoundary.module.scss';
import { ThemeContext } from '../../../context/themeContext';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    const context = this.context;

    if (!context) {
      return this.props.children;
    }

    const { theme } = context;

    return !this.state.hasError ? (
      this.props.children
    ) : (
      <div className={`${styles.container} ${styles[theme]}`}>
        <h2 className={styles.title}>Something went wrong...</h2>
        <p className={styles.description}>Don&apos;t worry!</p>
        <button
          className={styles.button}
          onClick={() => this.setState({ hasError: false })}
        >
          Try again
        </button>
      </div>
    );
  }
}
