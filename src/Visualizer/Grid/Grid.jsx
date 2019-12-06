import React, { useState, useRef } from 'react';
import './Grid.css'
import Cell, { CellTypes } from './Cell'


const GridComponent = ()=>{
    const [grid, setGrid] = useState(createGrid(20, 50))
    
    // Good reference
    // https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
    // I think that as long as I don't pass isMousePressed to my children, the integrity of the code
    // is fine...? I just need all eventHandlers to reference the same isMousePressed variable.
    var isMousePressed = useRef(false);

    const paintCell = (row, col) => {
        let newGrid = grid.slice();
        newGrid[row][col].type = 1;
        setGrid(newGrid);
    }

    const onCellMouseDown = (row, col) => {
        paintCell(row, col);
        isMousePressed.current = true;
    }

    const onCellMouseEnter = (row, col) => {
        if (!isMousePressed.current) 
            return;
        paintCell(row, col);
    }

    const onCellMouseUp = () => {
        isMousePressed.current = false;
    }
    return (
        <div id="grid" className="grid">
            {grid.map((rowObj, rowId) => {
                return ( 
                    <div id={`row-${rowId}`} key={`row-${rowId}`}> 
                    {rowObj.map((colObj) => {
                        const {row, col, type} = colObj;
                        return (
                            <Cell 
                                row={row} 
                                col={col} 
                                type={type} 
                                onMouseDown={onCellMouseDown}
                                onMouseUp={onCellMouseUp}
                                onMouseEnter={onCellMouseEnter} 
                            />
                        )
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


export default GridComponent;
