import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import './MazeBar.css'
import recursiveDvision from './maze-generation/recursive-division'
const MazeBar = () => {
    let context = useContext(VisualizerContext);
    const speed = 20;
    return (
        <div id="mazebar" className="mazebar">
            <span className="title">Maze</span>
            <span className="clickable" onClick={()=>{
               context.clearObstacles();
               let result = recursiveDvision(context.grid, 5, 5);
               context.animateMaze(speed, result)  
            }}>Recursive Division</span>
        </div>
    )
    
}


export default MazeBar;
