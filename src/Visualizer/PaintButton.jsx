import React, { useReducer, useContext, useEffect } from 'react';
import { VisualizerContext } from './Visualizer'
import './PaintButton.css'
import {CellTypes} from './Cell'

function ButtonState(frc) {
    this.frc = frc;
}

const PaintButton = ({type}) => {

    let [, forceRender] = useReducer((x) => x + 1, 0)
    let context = useContext(VisualizerContext);
    if(context.buttonStates[type] === null) {
        context.buttonStates[type] = new ButtonState(forceRender);
    }
    let extraClass = getExtraClassByType(type);
    let name = getNameByType(type)
    
    let selected = context.mode === type ? "paintbutton-selected" : "";

    return (
       
        <div 
            id={`btn-${type}`}
            className={`paintbutton ${selected}`}

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
            <span className={`paintbutton-text`}>{name}</span>
        </div>
    )
    
}


function getExtraClassByType(type) {
    return (
        type === CellTypes.NONE ? "paintbutton-extra-none" :
        type === CellTypes.OBSTACLE ? "paintbutton-extra-obstacle" :
        type === CellTypes.START ? "paintbutton-extra-start" :
        type === CellTypes.END ? "paintbutton-extra-end" : ""
        
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
