import * as React from 'react';
import './App.css';
import Grid from './Grid';
import { generateGrid } from './lib';

const ships: number[][][] = [
  [[0, 0], [0, -1], [0, -1], [0, -1]],
  [[0, 0]],
  [[0, 0]],
  [[0, 0], [0, -1], [0, -1], [0, -1], [1, 0]],
];

const grid: number[][] = generateGrid(10, 10, ships);

const winCount: number = ships.reduce((acc, e) => acc + e.length , 0);

type State = {
  shots: number;
  hits: number;
  win: boolean;
};

class App extends React.Component<object, State> {
  state: State = {
    shots: 0,
    hits: 0,
    win: false,
  };

  processShot = (result: number) => {
    const hits = this.state.hits + result;

    this.setState({
      shots: this.state.shots + 1,
      hits: hits,
      win: hits === winCount,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Seaworld, kid!</h1>
          <p className="App-counter">
            <span>Shots: {this.state.shots}</span>
            <span>Hits: {this.state.hits}</span>
          </p>
        </header>
        {
          this.state.win && (
            <h2>You win</h2>
          )
        }
        <Grid grid={grid} processShot={this.processShot}/>
      </div>
    );
  }
}

export default App;
