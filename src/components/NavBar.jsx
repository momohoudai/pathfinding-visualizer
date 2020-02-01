import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import './NavBar.css'
 
const NavBar = () => {
    let context = useContext(VisualizerContext);
    return (
        <div id="navbar" className="navbar">
            <span className="title">Commands</span>

            <span className="clickable" onClick={()=>{
                context.clearPath();
            }}>Clear Path</span>
            <span className="clickable"  onClick={()=>{
                context.clearBoard();
            }}>Clear Board</span>

            <span className="clickable"  onClick={()=>{
                context.clearObstacles();
            }}>Clear Obstacles</span>

 
        </div>
    )
    
}


export default NavBar;
