import React, { Component } from 'react';
import './App.css';
import VisualizerComponent from './Visualizer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2><span role="img" aria-label="peach">🍑 Momo's Pathfinding Visualizer 🍑</span></h2>
        </div>
        <VisualizerComponent/>
      </div>
    );
  }
}

export default App;
