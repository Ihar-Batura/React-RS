'use client';

import React from 'react';
import styles from './ErrorBoundary.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import { useTranslations } from 'next-intl';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorTitle?: string;
  errorDescription?: string;
  buttonText?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundaryClass extends React.Component<
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

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    const { errorTitle, errorDescription, buttonText } = this.props;
    const context = this.context;

    if (!context) {
      return this.props.children;
    }

    const { theme } = context;

    return !this.state.hasError ? (
      this.props.children
    ) : (
      <div className={`${styles.container} ${styles[theme]}`}>
        <h2 className={styles.title}>{errorTitle}</h2>
        <p className={styles.description}>{errorDescription}</p>
        <button className={styles.button} onClick={this.handleReset}>
          {buttonText}
        </button>
      </div>
    );
  }
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  let errorTitle = 'Something went wrong...';
  let errorDescription = 'Don&apos;t worry!';
  let buttonText = 'Try again';
  const t = useTranslations('ErrorBoundary');

  try {
    errorTitle = t('title');
    errorDescription = t('description');
    buttonText = t('buttonText');
  } catch (e) {
    console.warn('Failed to load translations for ErrorBoundary', e);
  }
  return (
    <ErrorBoundaryClass
      errorTitle={errorTitle}
      errorDescription={errorDescription}
      buttonText={buttonText}
    >
      {children}
    </ErrorBoundaryClass>
  );
};

export default ErrorBoundary;
