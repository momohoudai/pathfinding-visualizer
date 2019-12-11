import React, { useReducer, useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import './PaintBar.css'
import { CellTypes } from './Cell'
 
function PaintBarState () {
    this.frc = [];
}

const PaintBar = () => {
    let context = useContext(VisualizerContext);
    if (!context.paintBarState)
    {
        context.paintBarState = new PaintBarState()
    }
    return (
        <div id="navbar" className="paint-navbar">
            <a className="title">Paint Mode</a>
            <PaintBarButton type={CellTypes.NONE}/>
            <PaintBarButton type={CellTypes.OBSTACLE}/>
            <PaintBarButton type={CellTypes.START}/>
            <PaintBarButton type={CellTypes.END}/>
            
        </div>
    )
    
}

// Component for handling button logic
const PaintBarButton = ({type}) => {
    let context = useContext(VisualizerContext);
    let [, forceRender] = useReducer((x) => x + 1, 0)
    if (!context.paintBarState.frc[type]) {
        context.paintBarState.frc[type] = forceRender;
    }

    let name = getNameByType(type)
    let circleClass = getExtraClassByType(type);
    let isSelected = context.mode === type ? "selected" : "";
    return (
        
        <a className={`clickable ${isSelected}`} onClick={()=>{
            context.paintBarState.frc[context.mode]();
            context.mode = type;
            context.paintBarState.frc[context.mode]();
        }}>
            <div className={circleClass}></div>{name}
        </a>
    )
}



function getNameByType(type) {
    return (
        type === CellTypes.NONE ? "None" : 
        type === CellTypes.OBSTACLE ? "Obstacle" : 
        type === CellTypes.START ? "Start" : 
        type === CellTypes.END ? "End" : ""
    );

}

function getExtraClassByType(type) {
    return (
        type === CellTypes.NONE ? "button-circle-none" :
        type === CellTypes.OBSTACLE ? "button-circle-obstacle" :
        type === CellTypes.START ? "button-circle-start" :
        type === CellTypes.END ? "button-circle-end" : ""
        
    )
}


export default PaintBar;
