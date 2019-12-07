import React, { useReducer, useContext, useEffect } from 'react';
import { VisualizerContext } from './Visualizer'
import './Cell.css'

export const CellTypes = {
    NONE: 0,
    OBSTACLE: 1,
    START: 2,
    END: 3
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
    let cellData = context.grid[row][col];
    let extraClass = getExtraClassBasedOnType(cellData.type);
    
    useEffect(() => {   
        cellData.forceRenderCallback = forceRender;
        return () => delete cellData.forceRenderCallback;
    }, [forceRender]);

    // This is so that we can 'unpaint' start and end cell when it's updated.
    if (cellData.type == CellTypes.START)
        context.startCell = cellData;
    else if (cellData.type == CellTypes.END)
        context.endCell = cellData;
    

    const paintCell = () => {
        switch(context.mode){
            case CellTypes.OBSTACLE:
            case CellTypes.NONE:
                // Don't paint over start and ends
                if (cellData.type === CellTypes.START || cellData.type === CellTypes.END)
                    return;
                cellData.type = context.mode;
                cellData.forceRenderCallback();
                break;
            case CellTypes.START:
                if (context.startCell !== null) {
                    context.startCell.type = CellTypes.NONE
                    context.startCell.forceRenderCallback();
                }
                cellData.type = CellTypes.START;
                cellData.forceRenderCallback();
                break;
            case CellTypes.END:
                if (context.endCell !== null) {
                    context.endCell.type = CellTypes.NONE
                    context.endCell.forceRenderCallback();
                }
                cellData.type = CellTypes.END;
                cellData.forceRenderCallback();
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
        type == CellTypes.OBSTACLE ? "cell-obstacle" :
        type == CellTypes.START ? "cell-start" :
        type == CellTypes.END ? "cell-end" : ""
    )
}



export default Cell;
