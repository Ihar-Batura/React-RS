import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HookForm } from '../src/components/forms/HookForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../src/store/slices/countriesSlice';
import formReducer from '../src/store/slices/formSlice';

vi.mock('../../utils/convert-file-to-base64', () => ({
  convertToBase64: vi
    .fn()
    .mockResolvedValue('data:image/png;base64,mocked-base64-string'),
}));

describe('HookForm Component', () => {
  const createMockStore = () =>
    configureStore({
      reducer: {
        countries: countriesReducer,
        forms: formReducer,
      },
      preloadedState: {
        countries: {
          list: ['Poland', 'Germany'],
          selected: '',
        },
      },
    });

  const renderHookForm = (onClose = vi.fn()) => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <HookForm onClose={onClose} />
      </Provider>
    );
    return { onClose, store };
  };

  it('renders HookForm with correct structure', () => {
    renderHookForm();

    expect(screen.getByText('Hook Form')).toBeInTheDocument();
    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile picture:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/i accept the terms and conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent('Submit');
  });

  it('shows password strength indicator', async () => {
    renderHookForm();

    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(passwordInput, {
      target: { value: 'weak' },
    });

    await waitFor(() => {
      expect(screen.getByText(/password strength: weak/i)).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, {
      target: { value: 'StrongPassword123!' },
    });

    await waitFor(() => {
      expect(
        screen.getByText(/password strength: strong/i)
      ).toBeInTheDocument();
    });
  });

  it('submits form successfully and calls onClose', async () => {
    const mockOnClose = vi.fn();
    renderHookForm(mockOnClose);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your age'), {
      target: { value: '20' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: '@Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: '@Password123!' },
    });

    fireEvent.click(screen.getByLabelText('Male'));

    const countryInput = screen.getByPlaceholderText(
      'Start typing to select country'
    );
    fireEvent.change(countryInput, {
      target: { value: 'Pol' },
    });

    await waitFor(() => {
      expect(screen.getByText('Poland')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Poland'));

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const fileInput = screen.getByLabelText(/profile picture:/i);
    const file = new File(['content'], 'avatar.png', {
      type: 'image/png',
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
