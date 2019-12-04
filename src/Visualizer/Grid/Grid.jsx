import React, { useState } from 'react';
import './Grid.css'
import Cell from './Cell'

const Grid = ()=>{
    const [grid, setGrid] = useState(createGrid(20, 50))
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const onCellMouseDown = (row, col) => {
        let newGrid = grid.slice();
        newGrid[row][col].type = 1;
        setGrid(newGrid);
    }

    
    return (
        <div id="grid" className="grid">
            {grid.map((rowObj, rowId) => {
                return ( 
                    <div id={`row-${rowId}`} key={`row-${rowId}`}> 
                    {rowObj.map((colObj) => {
                        const {row, col, type} = colObj;
                        return <Cell row={row} col={col} type={type} onMouseDown={onCellMouseDown} />
                    })}
                    </div>
                )
            })}
        </div>
    )
}


const createGrid = (rows, cols) => {
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

const createNode = (row, col, type) => {
    return {
        row, 
        col,
        type
    };
}


export default Grid;
