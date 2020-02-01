import React, { useContext } from 'react';
import { VisualizerContext } from './Visualizer'
import astar from 'algorithms/pathfinding/astar'
import dfs from 'algorithms/pathfinding/dfs' 
import bfs from 'algorithms/pathfinding/bfs' 
import dijkstra from 'algorithms/pathfinding/dijkstra'
import './PathfindBar.css'
 
const PathfindBar = () => {
    let context = useContext(VisualizerContext);
    const speed = 10;
    return (
        <div id="pathfindbar" className="pathfindbar">
            <span className="title">Pathfind</span>
            <span className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = dfs(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(speed, result.visitedListInOrder, result.solution);
            }}>Depth First</span>
            <span className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = bfs(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(speed, result.visitedListInOrder, result.solution);
            }}>Breadth First</span>
            <span className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = dijkstra(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(speed, result.visitedListInOrder, result.solution);
            }}>Dijkstra</span>
            <span className="clickable" onClick={()=>{
                 context.clearPath();
                 const result = astar(context.grid, context.startRow, context.startCol, context.endRow, context.endCol)
                 context.animatePathfinding(speed, result.visitedListInOrder, result.solution);
            }}>A Star</span>
        </div>
    )
    
}


export default PathfindBar;
