import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import './NavBar.css'
 
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


 
        </div>
    )
    
}


export default NavBar;
