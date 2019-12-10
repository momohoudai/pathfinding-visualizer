import { CellTypes } from '../Cell'



function astar(grid, startCell, endCell) {
    let visitedListInOrder = [];
    let openList = [];
    let closedList = [];

    let goalNode = createNode(endCell);
    let startNode = createNode(startCell);
    startNode.h = heuristic(startNode, goalNode);

    openList.push(startNode);

    let solutionNode = null;
    while (openList.length !== 0) {
        let currentNode = removeLowestScoreNode(openList);
        
        if (currentNode.row === goalNode.row && currentNode.col === goalNode.col) {
            solutionNode = currentNode;
            break;
        }

       
        closedList.push(currentNode)
        visitedListInOrder.push(createVisitedNodeState(currentNode, CellTypes.VISITED));
        
        let neighbours = getNeighbours(currentNode, grid, goalNode);
        for (const neighbour of neighbours) {
            // Ignore Obstacles
            if (neighbour.type === CellTypes.OBSTACLE)
                continue;
            if (closedList.find( node => neighbour.row === node.row && neighbour.col === node.col)) {
                continue;
            }
            
            let openNode = openList.find( node => neighbour.row === node.row && neighbour.col === node.col);
            if (!openNode) {
                openList.push(neighbour)
                
                visitedListInOrder.push(createVisitedNodeState(neighbour, CellTypes.CONSIDERING));
            }
            else {
                // Update if f score is lower\
                if (f(openNode) > f(neighbour)) {
                    openNode = neighbour;
                }
            }
        }
    }

    let solution = reconstructPath(solutionNode);

    return {
        visitedListInOrder,
        solution
    };
}

function reconstructPath(solutionNode) {
    let result = [];
    let itr = solutionNode;
    while(itr != null)
    {
        result.push(itr);
        itr = itr.parent;
    }

    return result.reverse();
}

function createVisitedNodeState(node, type) {
    return {
        node: node,
        type: type
    }
}

function heuristic(node, goalNode) {
    return Math.abs(node.row - goalNode.row) + Math.abs(node.col - goalNode.col); 
}

function f(node) {
    return node.g + node.h;
}


function removeLowestScoreNode(open) {
    let lowest = 0;
    for (let i = 1; i < open.length; ++i) {
        lowest = f(open[i]) < f(open[lowest]) ? i : lowest;
    }    
    return open.splice(lowest, 1)[0];
}

function createNode(cell) {
    return {
        row: cell.row,
        col: cell.col,
        type: cell.type,
        g: 0,
        h: 0,
        parent: null,
        visited: false
    }
}

function getNeighbours(node, grid, goalNode) {
    
    let neighbours = [];
    let maxCols = grid[0].length;
    let maxRows = grid.length;
    
    function getNeighbourNode(parentNode, cell, goalNode) {
        let neighbour = createNode(cell);
        neighbour.g = parentNode.g + 1;
        neighbour.h = heuristic(neighbour, goalNode);
        neighbour.parent = parentNode;
    
        return neighbour;
    }

    if (node.row - 1 >= 0) {
        let cell = grid[node.row - 1][node.col];
        neighbours.push(getNeighbourNode(node, cell, goalNode));
    }
    if (node.col - 1 >= 0) {
        let cell = grid[node.row][node.col - 1];
        neighbours.push(getNeighbourNode(node, cell, goalNode));
    }
    if (node.row + 1 < maxRows) {
        let cell = grid[node.row + 1][node.col];
        neighbours.push(getNeighbourNode(node, cell, goalNode));
    }
    if (node.col + 1 < maxCols) {
        let cell = grid[node.row][node.col + 1];
        neighbours.push(getNeighbourNode(node, cell, goalNode));
    }

    return neighbours;
}


export default astar;