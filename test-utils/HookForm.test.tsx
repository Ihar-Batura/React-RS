import { render, screen } from '@testing-library/react';
import { HookForm } from '../src/components/forms/HookForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../src/store/slices/countriesSlice';
import formReducer from '../src/store/slices/formSlice';

describe('HookForm Component', () => {
  const createMockStore = () =>
    configureStore({
      reducer: {
        countries: countriesReducer,
        forms: formReducer,
      },
    });

  const renderHookForm = (onClose = vi.fn()) => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <HookForm onClose={onClose} />
      </Provider>
    );
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
});
