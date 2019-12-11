import React, { useState, createContext } from 'react';
import './Visualizer.css'
import Cell, { CellTypes } from './Cell'
import NavBar from './NavBar'
import PaintBar from './PaintBar'

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
VisualizerState.prototype.clearPath = function() {
    for (const row of this.grid) {
        for (const col of row) {
            if (isAny(col.type, [CellTypes.VISITED, CellTypes.CONSIDERING, CellTypes.PATH]))
            {
                col.type = CellTypes.NONE;
                col.frc();
            }
        }
    }
}
VisualizerState.prototype.clearBoard = function() {
    for (const row of this.grid) {
        for (const col of row) {
            if (!isAny(col.type, [CellTypes.START, CellTypes.END]))
            {
                col.type = CellTypes.NONE;
                col.frc();
            }
        }
    }
}

VisualizerState.prototype.animatePathfinding = function(speed, visitedListInOrder, solution) {
    let accumulatedInterval = 0;
    for(let i = 0; i < visitedListInOrder.length; ++i) {
        let visitedNode = visitedListInOrder[i];
        let cellState = this.grid[visitedNode.node.row][visitedNode.node.col];
        accumulatedInterval += speed;
    
        if( isAny(cellState.type, [CellTypes.START, CellTypes.END, CellTypes.OBSTACLE]))
            continue;
        
        setTimeout(() => {
            cellState.type = visitedNode.type;
            cellState.frc();    
        }, accumulatedInterval);
    }
    
    for(let i = 0; i < solution.length; ++i) {
        let solutionNode = solution[i];
        let cellState = this.grid[solutionNode.row][solutionNode.col];
        if( isAny(cellState.type, [CellTypes.START, CellTypes.END, CellTypes.OBSTACLE]))
           continue;
           
        accumulatedInterval += speed;
        setTimeout(() => {
            cellState.type = CellTypes.PATH;
            cellState.frc(); 
         }, accumulatedInterval)
    
    }
}


export const VisualizerContext = createContext();

function VisualizerComponent() {
    const [state] = useState(()=>new VisualizerState(20, 50, 10, 10, 10, 40))

    return (
        <VisualizerContext.Provider value={state}>
        <div id="visualizer">
            <NavBar/>
            <PaintBar/>
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
