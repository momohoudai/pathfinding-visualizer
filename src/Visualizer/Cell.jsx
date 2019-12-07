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
    
    let [, forceRender] = useReducer((x) => x + 1, 0)
    
    let context = useContext(VisualizerContext);
    let cellData = context.grid[row][col];
    let extraClass = getExtraClassBasedOnType(cellData.type);
    
    useEffect(() => {   
        cellData.forceRenderCallback = forceRender;
        return () => delete cellData.forceRenderCallback;
    }, [forceRender]);

    const paintCell = () => {
        cellData.type = 1;
        cellData.forceRenderCallback();
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
         ///   console.log("rerendering!")
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
