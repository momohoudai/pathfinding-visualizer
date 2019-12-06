import React, { memo, useState } from 'react';
import './Cell.css'

export const CellTypes = {
    NONE: 0,
    OBSTACLE: 1,
    START: 2,
    END: 3
}

const Cell = ({row, col, type, dispatch}) => {

    let extraClass = getExtraClassBasedOnType(type);
   

    return (
       
        <div 
            id={`col-${row}-${col}`}
            key={`col-${row}-${col}`} 
            className={`cell ${extraClass}`}
            onMouseDown={()=>{dispatch({type: 'cellMouseDown', row: row, col: col})}}
            onMouseUp={()=>{dispatch({type: 'cellMouseUp'})}}
            onMouseEnter={()=>{dispatch({type: 'cellMouseEnter', row: row, col: col})}}
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

function areEqual(prevProps, nextProps) {
    return (
        prevProps.row == nextProps.row &&
        prevProps.col == nextProps.col &&
        prevProps.type == nextProps.type 
    )
}


export default memo(Cell, areEqual);
