import React, { useState, createContext } from 'react';
import './Visualizer.css'
import Cell, { CellTypes } from './Cell'

const GRID_ROWS = 20;
const GRID_COLS = 50;
const START_ROW = 10;
const START_COL = 10;
const END_ROW = 10;
const END_COL = 40;

function VisualizerState() {
    this.grid = createGrid(GRID_ROWS, GRID_COLS);
    this.isMousePressed = false;
    this.mode = CellTypes.OBSTACLE;

    // for start and end management
    this.startCell = null;
    this.endCell = null;
}

export const VisualizerContext = createContext();

function VisualizerComponent() {
    const [state] = useState(()=>new VisualizerState())
    return (
        <VisualizerContext.Provider value={state}>
        <div id="visualizer">
            <button onClick={()=>state.mode = 0 }>Hello</button>
            <button onClick={()=>state.mode = 1 }>Hello</button>
            <button onClick={()=>state.mode = 2 }>Hello</button>
            <button onClick={()=>state.mode = 3 }>Hello</button>
            <div id="grid" className="grid">
                {state.grid.map((rowObj, rowId) => {
                    return ( 
                        <div id={`row-${rowId}`} key={`row-${rowId}`}> 
                        {rowObj.map((colObj) => {
                            const {row, col, type} = colObj;
                            return (
                                <Cell 
                                    row={row} 
                                    col={col} 
                                    type={type} 
                                />
                            )
                        })}
                        </div>
                    )
                })}
            </div>
        </div>
        </VisualizerContext.Provider>
    )
}

function createGrid(rows, cols) {
    const grid = [];
    for (let r = 0; r < rows; ++r) {
        const currentRow = [];
        for ( let c = 0; c < cols; ++c) {
            if (r === START_ROW && c === START_COL )
                currentRow.push(createCellData(r, c, CellTypes.START));
            else if (r === END_ROW && c === END_COL)
                currentRow.push(createCellData(r, c, CellTypes.END));
            else
                currentRow.push(createCellData(r, c, CellTypes.NONE));
        }
        grid.push(currentRow);
    }
    return grid;
}


function createCellData(row, col, type) {
    return {
        row: row, 
        col: col,
        type: type,
    };
}



export default VisualizerComponent;
