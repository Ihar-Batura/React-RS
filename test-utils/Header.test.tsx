import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../src/components/layout/header/Header';

describe('Header Component', () => {
  it('renders header element with logo', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('HEADER');

    const logoElement = screen.getByText('Star Trek');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement.tagName).toBe('H1');
  });
});
