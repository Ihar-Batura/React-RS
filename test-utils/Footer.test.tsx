import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { Footer } from '../src/components/layout/footer/Footer';

describe('Footer Component', () => {
  it('renders footer with correct structure', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement.tagName).toBe('FOOTER');

    const wrapper = footerElement.querySelector('div');
    expect(wrapper).toBeInTheDocument();

    const year = wrapper?.querySelector('p');
    expect(year).toBeInTheDocument();

    const link = wrapper?.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  it('renders copyright correctly', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const year = screen.getByText(`© ${currentYear}`);
    expect(year).toBeInTheDocument();
  });

  it('renders GitHub link correctly', () => {
    render(<Footer />);

    const link = screen.getByText(`Ihar Batura`);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/Ihar-Batura');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });
});
