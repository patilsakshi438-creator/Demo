import { render, screen } from '@testing-library/react';
import App from './App';

test('renders registration form heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/create account/i);
  expect(headingElement).toBeInTheDocument();
});
