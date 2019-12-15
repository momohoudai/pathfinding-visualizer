//https://stackoverflow.com/questions/23530756/maze-recursive-division-algorithm-design/23530960


const Orientation = {
    HORIZONTAL : true,
    VERTICAL : false
}

var holes = [];
function recursiveDivision(grid) {
    const resultCellList = [];
    const width = grid[0].length
    const height = grid.length

    divide(grid, 0, 0, width - 1, height - 1, resultCellList );
    holes = [];
    return resultCellList;

}



function divide(grid, sx, sy, ex, ey, resultCellList) {
    const width = ex - sx;
    const height = ey - sy
    const horizontal = chooseOrientation(width, height) === Orientation.HORIZONTAL;

    switch (horizontal)
    {
        case Orientation.HORIZONTAL:
        {
            if (width < 2)
                return;

            // Walls are on EVEN tiles
            let wallY = Math.floor(rand(sy, ey)/2)*2;

            // This is for the case where sy is an odd number and you rolled sy,
            // causing it to be sy - 1. Need to shift it back to the nearest even number
            if (wallY < sy) 
                wallY = sy + 1;

            // Holes are on ODD tiles
            let holeX = Math.floor(rand(sx, ex)/2)*2 + 1;

            // add wall
            for (let i = sx; i <= ex; ++i) {
                if ( i === holeX ) {
                    holes.push(grid[wallY][i]);
                    continue;
                }
                resultCellList.push(grid[wallY][i]);
                if (holes.find(h => h.row === wallY && h.col=== i)) {
                    console.log("DANGER H");
                    console.log({holeX, wallY})
                    console.log({sx, sy, ex, ey, horizontal});
                }
                else {
                    
                }
            }
            divide(grid, sx, sy, ex, wallY - 1, resultCellList);
            divide(grid, sx, wallY + 1, ex, ey, resultCellList);
        }
        break;

        // Basically do the same for vertical
        case Orientation.VERTICAL:
        {
            if (height < 2)
                return;
            let wallX = Math.floor(rand(sx, ex)/2)*2;
            if (wallX < sx) 
                wallX = sx + 1;
            let holeY = Math.floor(rand(sy, ey)/2)*2 + 1;

            // add wall
            for (let i = sy; i <= ey; ++i) {
                if ( i === holeY ) {
                    holes.push(grid[i][wallX]);
                    continue;
                }         
                resultCellList.push(grid[i][wallX]);
                if (holes.find(h => h.row === i && h.col=== wallX)) {
                    console.log("DANGER V");
                    console.log({wallX, holeY})
                    console.log({sx, sy, ex, ey, horizontal});
                }
                else {

                }
                    
            }
            divide(grid, sx, sy, wallX - 1, ey, resultCellList);
            divide(grid, wallX + 1, sy, ex, ey, resultCellList);
        }
        break;
        default:
            break;
    }
    
  

}

function chooseOrientation(width, height) {
    if (width < height) 
        return Orientation.HORIZONTAL;
    else if (height < width)
        return Orientation.VERTICAL;
    else {
        return rand(0, 1);
    }
}


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default recursiveDivision;
