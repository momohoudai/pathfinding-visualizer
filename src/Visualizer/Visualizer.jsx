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
}

export const VisualizerContext = createContext();

function VisualizerComponent() {
    const [state] = useState(()=>new VisualizerState())
    return (
        <VisualizerContext.Provider value={state}>
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
        </VisualizerContext.Provider>
    )
}

function createGrid(rows, cols) {
    const grid = [];
    for (let r = 0; r < rows; ++r) {
        const currentRow = [];
        for ( let c = 0; c < cols; ++c) {
            currentRow.push(createCellData(r, c, 0));
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
