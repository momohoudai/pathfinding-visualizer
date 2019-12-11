import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import astar from './algorithms/astar'
import './NavBar.css'
import { CellTypes } from './Cell'
 
const NavBar = () => {
    let context = useContext(VisualizerContext);
    return (
        <div id="navbar" className="navbar">
            <a className="title">Commands</a>

            <a className="clickable" onClick={()=>{
                context.clearPath();
            }}>Clear Path</a>
            <a className="clickable"  onClick={()=>{
                context.clearBoard();
            }}>Clear Board</a>


            <a className="clickable"  onClick={()=>{
                context.clearPath();
                const result = astar(context.grid, context.getStartCell(), context.getEndCell())
                context.animatePathfinding(10, result.visitedListInOrder, result.solution);
            }}>Animate</a>
        </div>
    )
    
}


function getPaintModeText(mode) {
    return (
        mode === CellTypes.NONE ? "None" :
        mode === CellTypes.START ? "Start" :
        mode === CellTypes.END ? "End" : 
        mode === CellTypes.OBSTACLE ? "Obstacle" : ""
    )
}

export default NavBar;
