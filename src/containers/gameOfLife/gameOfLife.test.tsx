import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameOfLife from './GameOfLife';

jest.mock('../../customHooks/useInterval', () => jest.fn());

describe('GameOfLife', () => {
    it('renders with initial rows and columns', () => {
        const initialRows = 5;
        const initialCols = 5;
        render(<GameOfLife initialRows={initialRows} initialCols={initialCols} />);

        expect(screen.getByLabelText(/Rows:/)).toHaveValue(initialRows);
        expect(screen.getByLabelText(/Columns:/)).toHaveValue(initialCols);
    });

    it('updates numRows and numCols when input values change', () => {
        render(<GameOfLife initialRows={5} initialCols={5} />);

        fireEvent.change(screen.getByLabelText(/Rows:/), { target: { value: '8' } });
        fireEvent.change(screen.getByLabelText(/Columns:/), { target: { value: '10' } });

        expect(screen.getByLabelText(/Rows:/)).toHaveValue(8);
        expect(screen.getByLabelText(/Columns:/)).toHaveValue(10);
    });

    it('starts and stops the simulation on button click', () => {
        render(<GameOfLife initialRows={5} initialCols={5} />);

        const startStopButton = screen.getByText(/Start/i);

        fireEvent.click(startStopButton);
        expect(startStopButton).toHaveTextContent('Stop');

        fireEvent.click(startStopButton);
        expect(startStopButton).toHaveTextContent('Start');
    });

    it('clears the board on button click', () => {
        render(<GameOfLife initialRows={5} initialCols={5} />);

        fireEvent.click(screen.getByText(/Clear/i));

        const cells = screen.getAllByTestId('cell');
        cells.forEach((cell) => {
            expect(cell).not.toHaveClass('alive');
        });
    });

    it('toggles cell state on cell click', () => {
        render(<GameOfLife initialRows={5} initialCols={5} />);

        const cell = screen.getAllByTestId('cell')[0]; // Get the first cell

        fireEvent.click(cell);
        expect(cell).toHaveClass('alive');

        fireEvent.click(cell);
        expect(cell).not.toHaveClass('alive');
    });
});
