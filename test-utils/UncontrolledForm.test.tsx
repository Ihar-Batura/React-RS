import { render, screen } from '@testing-library/react';
import { UncontrolledForm } from '../src/components/forms/UncontrolledForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../src/store/slices/countriesSlice';
import formReducer from '../src/store/slices/formSlice';

describe('UncontrolledForm Component', () => {
  const createMockStore = () =>
    configureStore({
      reducer: {
        countries: countriesReducer,
        forms: formReducer,
      },
    });

  const renderUncontrolledForm = (onClose = vi.fn()) => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <UncontrolledForm onClose={onClose} />
      </Provider>
    );
  };

  it('renders UncontrolledForm with correct structure', () => {
    renderUncontrolledForm();

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
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
