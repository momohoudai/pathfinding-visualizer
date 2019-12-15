import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import './NavBar.css'
 
const NavBar = () => {
    let context = useContext(VisualizerContext);
    return (
        <div id="navbar" className="navbar">
            <a href="javascript:void(0)" className="title">Commands</a>

            <a href="javascript:void(0)" className="clickable" onClick={()=>{
                context.clearPath();
            }}>Clear Path</a>
            <a href="javascript:void(0)" className="clickable"  onClick={()=>{
                context.clearBoard();
            }}>Clear Board</a>

            <a href="javascript:void(0)" className="clickable"  onClick={()=>{
                context.clearObstacles();
            }}>Clear Obstacles</a>

 
        </div>
    )
    
}


export default NavBar;
