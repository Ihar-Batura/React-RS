import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../src/components/layout/header/Header';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header Component', () => {
  it('renders header element with logo and navigation component', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('HEADER');

    const logoElement = screen.getByText('Star Trek');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement.tagName).toBe('H1');

    const navigateComponent = screen.getByRole('navigation');
    expect(navigateComponent).toBeInTheDocument();
  });

  it('calls navigate("/") when logo is clicked', () => {
    render(<Header />);

    const logoElement = screen.getByText('Star Trek');
    fireEvent.click(logoElement);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('calls navigate("/about") when button about is clicked', () => {
    render(<Header />);

    const buttonAbout = screen.getByText('About');
    fireEvent.click(buttonAbout);

    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
