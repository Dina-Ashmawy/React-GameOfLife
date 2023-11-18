import './cell.css';

interface CellProps {
    value: number;
    onClick: () => void;
}

/**
 * Represents a single cell in a game of life.
 * @param value - Determines whether the cell is alive (1) or dead (0).
 * @param onClick - A function that gets called when the cell is clicked.
 * @returns A <div> element representing the cell.
 */
const Cell = ({ value, onClick }: CellProps) => {
    const cellClassName = value === 1 ? 'cell alive' : 'cell';

    return (
        <div data-testid="cell" className={cellClassName} onClick={onClick} ></div >
    );
};

export default Cell;