import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cell from './Cell';

describe('Cell', () => {
    test('renders cell with "alive" class when value is 1', () => {
        const onClickMock = jest.fn();
        render(<Cell value={1} onClick={onClickMock} />);
        const cell = screen.getByTestId('cell');

        expect(cell).toHaveClass('cell');
        expect(cell).toHaveClass('alive');

        fireEvent.click(cell);
        expect(onClickMock).toHaveBeenCalled();
    });

    test('renders cell without "alive" class when value is 0', () => {
        const onClickMock = jest.fn();
        render(<Cell value={0} onClick={onClickMock} />);

        const cell = screen.getByTestId('cell');

        expect(cell).toHaveClass('cell');
        expect(cell).not.toHaveClass('alive');

        fireEvent.click(cell);
        expect(onClickMock).toHaveBeenCalled();
    });
});
