import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../src/components/layout/header/Header';

vi.mock('../src/components/modal/Modal', () => ({
  Modal: vi.fn(({ isOpen, onClose, children }) => {
    return isOpen ? (
      <div data-testid="modal">
        <button data-testid="modal-close" onClick={onClose}>
          Close Modal
        </button>
        {children}
      </div>
    ) : null;
  }),
}));

vi.mock('../src/components/forms/HookForm', () => ({
  HookForm: vi.fn(({ onClose }) => (
    <div data-testid="hook-form">
      <h3>Hook Form</h3>
      <button onClick={onClose}>Close Hook Form</button>
    </div>
  )),
}));

vi.mock('../src/components/forms/UncontrolledForm', () => ({
  UncontrolledForm: vi.fn(({ onClose }) => (
    <div data-testid="uncontrolled-form">
      <h3>Uncontrolled Form</h3>
      <button onClick={onClose}>Close Uncontrolled Form</button>
    </div>
  )),
}));

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

  it('opens modal with UncontrolledForm when Form 1 button is clicked', () => {
    renderHeader();

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    const form1Button = screen.getByText('Form 1');
    fireEvent.click(form1Button);

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    const uncontrolledForm = screen.getByTestId('uncontrolled-form');
    expect(uncontrolledForm).toBeInTheDocument();
    expect(uncontrolledForm).toHaveTextContent('Uncontrolled Form');
  });

  it('opens modal with UncontrolledForm when Form 2 button is clicked', () => {
    renderHeader();

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    const form2Button = screen.getByText('Form 2');
    fireEvent.click(form2Button);

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    const uncontrolledForm = screen.getByTestId('hook-form');
    expect(uncontrolledForm).toBeInTheDocument();
    expect(uncontrolledForm).toHaveTextContent('Hook Form');
  });
});
