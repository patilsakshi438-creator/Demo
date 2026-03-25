import { render, screen } from '@testing-library/react';
import App from './App';

test('renders separate registration and login forms', () => {
  render(<App />);
  expect(screen.getByText(/create account/i)).toBeInTheDocument();
  expect(screen.getByText(/sign in/i)).toBeInTheDocument();
});
