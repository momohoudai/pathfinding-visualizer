import React, { useReducer, useContext, useEffect } from 'react';
import { VisualizerContext } from './Visualizer'
import './Cell.css'

export const CellTypes = {
    NONE: 0,
    OBSTACLE: 1,
    START: 2,
    END: 3,
    VISITED: 4,
    CONSIDERING: 5 // open_list
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
    let cellState = context.grid[row][col];
    let extraClass = getExtraClassBasedOnType(cellState.type);
    
    useEffect(() => {   
        cellState.frc = forceRender;
        return () => delete cellState.frc;
    }, [forceRender]);

    // This is so that we can 'unpaint' start and end cell when it's updated.
    if (cellState.type === CellTypes.START)
        context.startCell = cellState;
    else if (cellState.type === CellTypes.END)
        context.endCell = cellState;
    

    const paintCell = () => {
        switch(context.mode){
            case CellTypes.OBSTACLE:
            case CellTypes.NONE:
                // Don't paint over start and ends
                if (cellState.type === CellTypes.START || cellState.type === CellTypes.END)
                    return;
                cellState.type = context.mode;
                cellState.frc();
                break;
            case CellTypes.START:
                if (context.startCell !== null) {
                    context.startCell.type = CellTypes.NONE
                    context.startCell.frc();
                }
                cellState.type = CellTypes.START;
                cellState.frc();
                break;
            case CellTypes.END:
                if (context.endCell !== null) {
                    context.endCell.type = CellTypes.NONE
                    context.endCell.frc();
                }
                cellState.type = CellTypes.END;
                cellState.frc();
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
         {
         }
        </div>
    )
    
}


function getExtraClassBasedOnType(type) {
    return (
        type === CellTypes.OBSTACLE ? "cell-obstacle" :
        type === CellTypes.START ? "cell-start" :
        type === CellTypes.END ? "cell-end" : 
        type === CellTypes.CONSIDERING ? "cell-considering" : 
        type === CellTypes.VISITED ? "cell-visited" : ""
    )
}



export default Cell;
