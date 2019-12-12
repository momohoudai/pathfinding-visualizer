import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import astar from './pathfinding/astar'
import dfs from './pathfinding/dfs' 
import bfs from './pathfinding/bfs' 
import dijkstra from './pathfinding/dijkstra'
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
            }}>Depth First</a>
            <a className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = bfs(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(10, result.visitedListInOrder, result.solution);
            }}>Breadth First</a>
            <a className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = dijkstra(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(10, result.visitedListInOrder, result.solution);
            }}>Dijkstra</a>
            <a className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = astar(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(10, result.visitedListInOrder, result.solution);
            }}>A Star</a>
        </div>
    )
    
}


export default PathfindBar;
