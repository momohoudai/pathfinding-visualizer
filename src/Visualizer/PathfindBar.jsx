import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import astar from './algorithms/astar'
import dfs from './algorithms/dfs' 
import './PathfindBar.css'
 
const PathfindBar = () => {
    let context = useContext(VisualizerContext);
    return (
        <div id="pathfindbar" className="pathfindbar">
            <a className="title">Pathfind</a>
            <a className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = dfs(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(10, result.visitedListInOrder, result.solution);
            }}>DFS</a>

            <a className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = astar(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(10, result.visitedListInOrder, result.solution);
            }}>A Star</a>
        </div>
    )
    
}


export default PathfindBar;
