import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('switches between separate registration and login forms', () => {
  render(<App />);

  expect(screen.getByText(/create account/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/sign in/i)).toBeInTheDocument();
});
