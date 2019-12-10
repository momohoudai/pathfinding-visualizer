import React, { useReducer, useContext, useEffect } from 'react';
import { VisualizerContext } from './Visualizer'
import './PaintButton.css'
import {CellTypes} from './Cell'

function ButtonState(frc) {
    this.frc = frc;
}

const CommandButton = ({type}) => {
    return (
       
        <div 
            id={`btn-${type}`}
            className={`button ${selected}`}

            onMouseDown={() => {
                context.buttonStates[context.mode].frc();
                context.mode = type;
                context.buttonStates[context.mode].frc();
            }}          
        >
            <div 
                id={`btn-${type}-extra`}
                className={`${extraClass}`}>
            </div>
            <span className={`button-text`}>{name}</span>
        </div>
    )
    
}


function getExtraClassByType(type) {
    return (
        type === CellTypes.NONE ? "button-extra-none" :
        type === CellTypes.OBSTACLE ? "button-extra-obstacle" :
        type === CellTypes.START ? "button-extra-start" :
        type === CellTypes.END ? "button-extra-end" : ""
        
    )
}

function getNameByType(type) {
    return (
        type === CellTypes.NONE ? "None" :
        type === CellTypes.OBSTACLE ? "Obstacle" :
        type === CellTypes.START ? "Start" :
        type === CellTypes.END ? "End" : ""
        
    )
}



export default PaintButton;
