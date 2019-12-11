import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VisualizerComponent from './Visualizer/Visualizer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>🍑 Momo's Pathfinding Visualizer 🍑</h2>
        </div>
        <VisualizerComponent/>
      </div>
    );
  }
}

export default App;
