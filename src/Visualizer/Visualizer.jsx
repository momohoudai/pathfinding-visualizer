import React, { useState, createContext } from 'react';
import './Visualizer.css'
import Cell, { CellTypes } from './Cell'
import Button from './Button'
import astar from './algorithms/astar'

const GRID_ROWS = 20;
const GRID_COLS = 50;
const START_ROW = 10;
const START_COL = 10;
const END_ROW = 10;
const END_COL = 40;

function VisualizerState() {
    this.grid = createGrid(GRID_ROWS, GRID_COLS, START_ROW, START_COL, END_ROW, END_COL);
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
 
            <div>
                <button onClick={()=>{
                    console.log("animation started");
                    let result = astar(state.grid, state.grid[START_ROW][START_COL], state.grid[END_ROW][END_COL])
                    
                    for(const visitedNode of result.visitedListInOrder) {
                        let cellState = state.grid[visitedNode.node.row][visitedNode.node.col];
                        if( cellState.type === CellTypes.START || 
                            cellState.type === CellTypes.END ||
                            cellState.type === CellTypes.OBSTACLE)
                            continue;
                        
                        cellState.type = visitedNode.type;
                        cellState.frc();
                    }



                }}>Animate!</button>
            </div>
            <div id="toolbox" className="toolbox">
                <Button type={CellTypes.NONE} />
                <Button type={CellTypes.OBSTACLE} />
                <Button type={CellTypes.START} />
                <Button type={CellTypes.END} />
            </div>
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

function createGrid(rows, cols, startRow, startCol, endRow, endCol) {
    const grid = [];
    for (let r = 0; r < rows; ++r) {
        const currentRow = [];
        for ( let c = 0; c < cols; ++c) {
            if (r === startRow && c === startCol )
                currentRow.push(createCellData(r, c, CellTypes.START));
            else if (r === endRow && c === endCol)
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
        visited: false,
        frc: ()=>{}
    };
}

function createButtonStates() {
    const states = [];
    for (let i = CellTypes.NONE; i <= CellTypes.END; ++i )
        states.push({})
    return states;
}


export default VisualizerComponent;
