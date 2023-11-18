import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the GameOfLife component with initialRows and initialCols props', () => {
  render(<App />);
  // Check if GameOfLife component is rendered
  const gameOfLifeElement = screen.getByTestId('game-of-life');
  expect(gameOfLifeElement).toBeInTheDocument();
});