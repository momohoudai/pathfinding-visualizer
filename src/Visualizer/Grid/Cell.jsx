import React, { memo, useState } from 'react';
import './Cell.css'

const Cell = ({row, col, type, onMouseDown}) => {

    let extraClass = getExtraClassBasedOnType(type);
   

    return (
       
        <div 
            id={`col-${row}-${col}`}
            key={`col-${row}-${col}`} 
            className={`cell ${extraClass}`}
            onMouseDown={()=>{onMouseDown(row, col)}}
        >
         {console.log("rerendering!")}
        </div>
    )
    
}


function getExtraClassBasedOnType(type) {
    return (
        type == 1 ? "cell-obstacle" :
        type == 2 ? "cell-start" :
        type == 3 ? "cell-end" : ""
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
