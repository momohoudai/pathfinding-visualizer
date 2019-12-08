import React, { useState, createContext } from 'react';
import './Visualizer.css'
import Cell, { CellTypes } from './Cell'
import Button from './Button'

const GRID_ROWS = 20;
const GRID_COLS = 50;
const START_ROW = 10;
const START_COL = 10;
const END_ROW = 10;
const END_COL = 40;

function VisualizerState() {
    this.cellStates = createCellStates(GRID_ROWS, GRID_COLS);
    this.isMousePressed = false;
    this.mode = CellTypes.OBSTACLE;

    // for start and end management
    this.startCell = null;
    this.endCell = null;

    // for button use
    this.buttonStates = createButtonStates();

}

export const VisualizerContext = createContext();

function VisualizerComponent() {
    const [state] = useState(()=>new VisualizerState())
    return (
        <VisualizerContext.Provider value={state}>
        <div id="visualizer">
            <div id="toolbox" className="toolbox">
            <Button type={CellTypes.NONE} />
            <Button type={CellTypes.OBSTACLE} />
            <Button type={CellTypes.START} />
            <Button type={CellTypes.END} />
            </div>

            <div id="grid" className="grid">
                {state.cellStates.map((rowObj, rowId) => {
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

function createCellStates(rows, cols) {
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

function createButtonStates() {
    const states = [];
    for (let i = CellTypes.MIN; i <= CellTypes.MAX; ++i )
        states.push({})
    return states;
}


export default VisualizerComponent;
