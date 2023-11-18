import React, { useCallback, useEffect, useRef, useState } from 'react';
import useInterval from '../../customHooks/useInterval';
import { positions } from '../../constants';
import Cell from '../../components/cell/Cell';
import './gameOfLife.css';

interface GameOfLifeProps {
    initialRows: number;
    initialCols: number;
}

const GameOfLife = ({ initialRows, initialCols }: GameOfLifeProps) => {
    // State for the number of rows and columns
    const [gridSize, setGridSize] = useState({ numRows: initialRows, numCols: initialCols });

    // Function to generate an empty grid
    const generateEmptyGrid = (rows: number, cols: number): (1 | 0)[][] => {
        return Array.from(Array(rows), () => Array(cols).fill(0));
    };

    // State for the grid and simulation running status
    const [grid, setGrid] = useState(() => generateEmptyGrid(gridSize.numRows, gridSize.numCols));
    const [running, setRunning] = useState(false);

    // Ref to keep track of running status without triggering re-renders
    const runningRef = useRef<boolean>(running);
    runningRef.current = running;

    // Effect to reset the grid and update column styles when the number of rows or columns changes
    useEffect(() => {
        setGrid(generateEmptyGrid(gridSize.numRows, gridSize.numCols));
        document.documentElement.style.setProperty('--numCols', gridSize.numCols.toString());
    }, [gridSize.numRows, gridSize.numCols]);

    // Function to run the simulation
    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        const gridCopy = grid.map((row, i) =>
            row.map((col, j) => {
                const neighbors = calculateNeighbors(i, j);

                if (neighbors < 2 || neighbors > 3) {
                    return 0;
                } else if (col === 0 && neighbors === 3) {
                    return 1;
                } else {
                    return col;
                }
            })
        );

        setGrid(gridCopy);
    }, [grid, gridSize.numRows, gridSize.numCols]);

    // Custom hook to run the simulation at a specified interval
    useInterval(runSimulation, 150);

    // Function to handle a cell click and toggle its state
    const handleCellClick = (row: number, col: number) => {
        const gridCopy = grid.map(row => [...row]);
        gridCopy[row][col] = grid[row][col] ? 0 : 1;
        setGrid(gridCopy);
    };

    // Event handler for changing the number of rows
    const handleNumRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setGridSize({ ...gridSize, numRows: value });
        }
    };

    // Event handler for changing the number of columns
    const handleNumColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setGridSize({ ...gridSize, numCols: value });
        }
    };

    // Function to calculate the number of live neighbors for a cell
    const calculateNeighbors = (i: number, j: number): number => {
        return positions.reduce((acc, [x, y]) => {
            const newI = i + x;
            const newJ = j + y;

            if (newI >= 0 && newI < gridSize.numRows && newJ >= 0 && newJ < gridSize.numCols) {
                acc += grid[newI][newJ];
            }
            return acc;
        }, 0);
    };

    return (
        <div>
            <h1>Game Of Life</h1>
            <div>
                {/* Input for the number of rows */}
                <label>
                    Rows: <input
                        type="number"
                        value={gridSize.numRows}
                        onChange={handleNumRowsChange} />
                </label>
                {/* Input for the number of columns */}
                <label>
                    Columns: <input
                        type="number"
                        value={gridSize.numCols}
                        onChange={handleNumColsChange}
                    />
                </label>
            </div>
            {/* Button to start/stop the simulation */}
            <button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'}</button>
            {/* Button to clear the grid */}
            <button onClick={() => setGrid(generateEmptyGrid(gridSize.numRows, gridSize.numCols))}>Clear</button>
            {/* Game container to display the grid */}
            <div className="game-container" data-testid="game-of-life">
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <Cell
                            key={`${i}-${k}`}
                            value={grid[i][k]}
                            onClick={() => handleCellClick(i, k)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default GameOfLife;
