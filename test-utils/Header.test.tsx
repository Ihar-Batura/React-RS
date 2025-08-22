import { render, screen } from '@testing-library/react';
import { Header } from '../src/components/layout/header/Header';

describe('Header Component', () => {
  const renderHeader = () => {
    return render(<Header />);
  };

  it('renders header element with correct structure', () => {
    renderHeader();

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('HEADER');

    const container = headerElement.querySelector('div');
    expect(container).toBeInTheDocument();
  });

  it('renders two buttons with correct labels', () => {
    renderHeader();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    expect(buttons[0]).toHaveTextContent('Form 1');
    expect(buttons[1]).toHaveTextContent('Form 2');
  });
});
