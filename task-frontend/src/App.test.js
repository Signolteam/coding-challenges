import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Renders TaskCSVReader', () => {
    render(<App />);
    const TaskCSVReader = screen.getByText(/Upload CSV/i);
    expect(TaskCSVReader).toBeInTheDocument();
  });

  it('Renders TaskTable', () => {
    render (<App />);
    const TaskTable = screen.getByRole(/table/i);
    expect(TaskTable).toBeInTheDocument();
  });
});
