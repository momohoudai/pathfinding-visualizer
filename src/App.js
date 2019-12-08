import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VisualizerComponent from './Visualizer/Visualizer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pathfinding Visualizer</h2>
        </div>
        <p className="App-intro">
          <VisualizerComponent/>
        </p>
      </div>
    );
  }
}

export default App;
