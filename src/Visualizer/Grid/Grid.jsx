import React, { useState, useRef, useReducer } from 'react';
import './Grid.css'
import Cell, { CellTypes } from './Cell'



const gridState = {
    grid: createGrid(20, 50),
    isMousePressed: false,
    mode: CellTypes.OBSTACLE
}

const gridReducer = (state, action) => {
    function paintCell(row, col, type) {
        let newGrid = state.grid.slice();
        newGrid[row][col].type = type;
        return newGrid;
    }

    switch(action.type) {
        case "cellMouseDown":
            return { ...state, grid: paintCell(action.row, action.col, state.mode), isMousePressed: true };
        case "cellMouseUp":
            return {...state, isMousePressed: false}
        case "cellMouseEnter":
            console.log(state)
            if (state.isMousePressed) {
                return { ...state, grid: paintCell(action.row, action.col, state.mode), isMousePressed: true };
            }
            return {...state}
        default:
            throw new Error('unexpected action');
    }
}



function GridComponent() {
    const [state, dispatch] = useReducer(gridReducer, gridState);
    
    return (
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
                                dispatch={dispatch}
                            />
                        )
                    })}
                    </div>
                )
            })}
        </div>
    )
}

function createGrid(rows, cols) {
    const grid = [];
    for (let r = 0; r < rows; ++r) {
        const currentRow = [];
        for ( let c = 0; c < cols; ++c) {
            currentRow.push(createNode(r, c, 0));
        }
        grid.push(currentRow);
    }
    return grid;
}


function createNode(row, col, type) {
    return {
        row, 
        col,
        type
    };
}



export default GridComponent;
