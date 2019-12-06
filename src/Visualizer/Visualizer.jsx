import React, { useState } from 'react';
import GridComponent from './Grid/Grid'

function Visualizer() {

    const [mode, setMode] = useState(0)

    return (
        <div>
            <div>
                <button>Mode 1</button>
                <button>Mode 2</button>
                <button>Mode 3</button>
            </div>
            <GridComponent/>
        </div>
    )
}


export default Visualizer;
