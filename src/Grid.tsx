import * as React from 'react';
import Cell from './Cell';

interface Props {
  grid: Array<Array<number>>;
  processShot?: (a: number) => void;
}

class Grid extends React.Component<Props, object> {
  render() {
    return (
      <div className="Grid">
        { 
          this.props.grid.map((e: Array<number>, i: number) => {
            return (
              <div key={i}>
                {e.map((x: number, j: number) => <Cell status={x} key={j} callback={this.props.processShot}/>)}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Grid;