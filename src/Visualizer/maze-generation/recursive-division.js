const Orientation = {
    HORIZONTAL : true,
    VERTICAL : false
}


function recursiveDivision(grid, minWidth, minHeight) {
    let resultCellList = [];
    let width = grid[0].length
    let height = grid.length

    // draw the initial border around the grid
    /*for (let i = 0; i < width; ++i) resultCellsList.push(grid[0][i]); //top
    for (let i = 0; i < height; ++i) resultCellsList.push(grid[i][width-1]); // right
    for (let i = width - 1; i >= 0; --i) resultCellsList.push(grid[height-1][i]); // bottom
    for (let i = height - 1; i >= 0; --i) resultCellsList.push(grid[i][0]);
    */
    
    
    


    divide(grid, minWidth, minHeight, 0, 0, width, height, chooseOrientation(width, height), resultCellList );

    return resultCellList;

}



function divide(grid, minWidth, minHeight, x, y, width, height, orientation, resultCellList) {
    if (width < minWidth || height < minHeight)
        return;
    

    let horizontal = orientation == Orientation.HORIZONTAL;

    // start point of the wall
    let wx = x + (horizontal ? 0 : rand(width - minWidth));
    let wy = y + (horizontal ? rand(height - minHeight) : 0);

    // length of the wall
    let length = horizontal ? width : height;

    // hole on the wall
    let hx = wx + (horizontal ? rand(width - 2) + 1 : 0)
    let hy = wy + (horizontal ? 0 : rand(height - 2) + 1);

    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;

    for(let i = 0; i < length; ++i, wx += dx, wy += dy) {
        if (wx === hx && wy === hy)
            continue;
        resultCellList.push(grid[wy][wx]);
    }

    let nx = x;
    let ny = y;
    let nw = horizontal ? width : wx - x + 1;
    let nh = horizontal ? wy - y + 1 : height;
    divide(grid, minWidth, minHeight, nx, ny, nw, nh, chooseOrientation(nw, nh), resultCellList); 


    /*nx = horizontal ? x : wx + 1
    ny = horizontal ? wy + 1 : y;
    nw = horizontal ? width : x + width - wx - 1;
    nh = horizontal ? height : y + height - wy - 1;
    divide(grid, minWidth, minHeight, nx, ny, nw, nh, chooseOrientation(nw, nh), resultCellList); */

}

function chooseOrientation(width, height) {
    if (width < height) 
        return Orientation.HORIZONTAL;
    else if (height < width)
        return Orientation.VERTICAL;
    else {
        return rand(2);
    }
}

function rand(num) {
    return Math.floor(Math.random() * num);
}

export default recursiveDivision;
