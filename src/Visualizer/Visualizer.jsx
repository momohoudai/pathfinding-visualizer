import React, { useState, createContext } from 'react';
import './Visualizer.css'
import Cell, { CellTypes } from './Cell'
import Button from './Button'
import astar from './algorithms/astar'

function VisualizerState(
    rows, cols, 
    initial_start_row, initial_start_col, 
    initial_end_row, initial_end_col
) 
{
    this.grid = createGrid(rows, cols);
    this.isMousePressed = false;
    this.mode = CellTypes.OBSTACLE;

    // for start and end management
    this.startRow = initial_start_row;
    this.startCol = initial_start_col;
    this.endRow = initial_end_row;
    this.endCol = initial_end_col;

    // for button use
    this.buttonStates = createButtonStates();
}

VisualizerState.prototype.getStartCell = function() {
    return this.grid[this.startRow][this.startCol];
}
VisualizerState.prototype.getEndCell = function() {
    return this.grid[this.endRow][this.endCol];
}
VisualizerState.prototype.setStartCell = function(row, col) {
    this.startRow = row;
    this.startCol = col;
}
VisualizerState.prototype.setEndCell = function(row, col) {
    this.endRow = row;
    this.endCol = col;
}

export const VisualizerContext = createContext();

function VisualizerComponent() {
    const [state] = useState(()=>new VisualizerState(20, 50, 10, 10, 10, 40))

    return (
        <VisualizerContext.Provider value={state}>
        <div id="visualizer">
 
            <div>
                <button onClick={()=>{ 
                    const result = astar(state.grid, state.getStartCell(), state.getEndCell())
                    const speed = 10;
                    let accumulatedInterval = 0;
                    for(let i = 0; i < result.visitedListInOrder.length; ++i) {
                        let visitedNode = result.visitedListInOrder[i];
                        let cellState = state.grid[visitedNode.node.row][visitedNode.node.col];
                        accumulatedInterval += speed;

                        if( isAny(cellState.type, [CellTypes.START, CellTypes.END, CellTypes.OBSTACLE]))
                            continue;
                        setTimeout(() => {
                            cellState.type = visitedNode.type;
                            cellState.frc();    
                        }, accumulatedInterval)

                    }

                    for(let i = 0; i < result.solution.length; ++i) {
                        let solutionNode = result.solution[i];
                        let cellState = state.grid[solutionNode.row][solutionNode.col];
                        if( isAny(cellState.type, [CellTypes.START, CellTypes.END, CellTypes.OBSTACLE]))
                            continue;
                        
                        accumulatedInterval += speed;
                        setTimeout(() => {
                            cellState.type = CellTypes.PATH;
                            cellState.frc(); 
                        }, accumulatedInterval)

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
                        {rowObj.map((colObj, colId) => {
                            return (
                                <Cell 
                                    row={rowId} 
                                    col={colId} 
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
           currentRow.push(null)
        }
        grid.push(currentRow);
    }
    return grid;
}


function createButtonStates() {
    const states = [];
    for (let i = CellTypes.NONE; i <= CellTypes.END; ++i )
        states.push(null);
    return states;
}

function isAny(x, arr) {
    for (let element of arr) {
        if (x === element)
            return true;
    }
    return false;
}

export default VisualizerComponent;
