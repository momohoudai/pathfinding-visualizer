import React, { useReducer, useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import './Cell.css'

export const CellTypes = {
    NONE: 0,
    OBSTACLE: 1,
    START: 2,
    END: 3,
    VISITED: 4,
    CONSIDERING: 5, // open_list
    PATH: 6
}

function CellState(row, col, type, frc) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.frc = frc;
}

const Cell = ({row, col}) => {
    
    // Simulates forceRender() from the class version.
    //
    // Basically, this defines a state that is a simple int variable x
    // In React, when a state changes, the component will rerender.
    // This will create a function forceRender() that, when called, will
    // force increment x by 1 -> thus changing the state -> thus 
    // rerendering the component.
    //
    let [, forceRender] = useReducer((x) => x + 1, 0)
    let context = useContext(VisualizerContext);


    if (context.grid[row][col] === null) {
        let type = (context.startRow === row && context.startCol === col) ? CellTypes.START :
                    (context.endRow === row && context.endCol === col) ? CellTypes.END : CellTypes.NONE
        context.grid[row][col] = new CellState(row, col, type, forceRender);
    }
       
    let cellState = context.grid[row][col];
    let extraClass = getExtraClassBasedOnType(cellState.type);
    

    const paintCell = () => {
        switch(context.mode){
            case CellTypes.OBSTACLE:
            case CellTypes.NONE:
                if (cellState.type === CellTypes.START || cellState.type === CellTypes.END)
                    return;
                context.setCellType(cellState.row, cellState.col, context.mode);
                break;
            case CellTypes.START:
                let startCell = context.getStartCell();
                if (startCell !== null) {
                    context.setCellType(startCell.row, startCell.col, CellTypes.NONE);
                }
                context.setStartCell(row, col, CellTypes.START);
                break;
            case CellTypes.END:
                let endCell = context.getEndCell();
                if (endCell !== null) {
                    context.setCellType(endCell.row, endCell.col, CellTypes.NONE);
                }
                context.setEndCell(row, col, CellTypes.END);
                break;
            default:
                break;
        }
        
    }
    
    return (
        <div 
            id={`col-${row}-${col}`}
            className={`cell ${extraClass}`}
            onMouseUp={() => {
                context.isMousePressed = false;
            }}
            onMouseDown={() => {
                paintCell();
                context.isMousePressed = true;
            }}
            onMouseEnter={() => {
                if (context.isMousePressed)
                    paintCell();
            }}

            
        >
        </div>
    )
    
}

function getExtraClassBasedOnType(type) {
    return (
        type === CellTypes.OBSTACLE ? "cell-obstacle" :
        type === CellTypes.START ? "cell-start" :
        type === CellTypes.END ? "cell-end" : 
        type === CellTypes.CONSIDERING ? "cell-considering" : 
        type === CellTypes.PATH ? "cell-path" : 
        type === CellTypes.VISITED ? "cell-visited" : ""
    )
}



export default Cell;
