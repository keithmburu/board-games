import React from 'react';


export function Connect4Button(props) {
    return (
        <button
          id={props.id}
          className="connect4Button"
          onClick={props.onClick}>
        </button>
    );
}

  
export class Connect4Input extends React.Component {
    renderConnect4Button(i) {
      return <Connect4Button 
                id={"connect"+i}
                onClick={() => this.props.onClick(i)}/>;
    }
  
    render() {
      if ((this.props.game != 1)) {
        return <div></div>;
      } else {
        let inputs = [];
        let row = []
        for (let i = 0; i < 7; i++) {
          row.push(this.renderConnect4Button(i));
        }
        inputs.push(<div> {row} </div>);
        return inputs;
      }
    }
  }


export function calculateConnect4Winner(squares) {
    let r = 6;
    let c = 7;
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c-3; j++) {
        if (squares[i*c+j] && squares[i*c+j] === squares[i*c+j+1] && squares[i*c+j] === squares[i*c+j+2] && squares[i*c+j] === squares[i*c+j+3]) {
          return [squares[i*c+j], i*c+j, i*c+j+1, i*c+j+2, i*c+j+3];
        }
      }
    }
    for (let j = 0; j < c; j++) {
      for (let i = 0; i < r-3; i++) {
        if (squares[i*c+j] && squares[i*c+j] === squares[(i+1)*c+j] && squares[i*c+j] === squares[(i+2)*c+j] && squares[i*c+j] === squares[(i+3)*c+j]) {
          return [squares[i*c+j], i*c+j, (i+1)*c+j, (i+2)*c+j, (i+3)*c+j];
        }
      }
    }
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if ((i === 0 && j < 4) || (i < 3 && j === 0)) {
          if (squares[i*c+j] && squares[i*c+j] === squares[(i+1)*c+j+1] && squares[i*c+j] === squares[(i+2)*c+j+2] && squares[i*c+j] === squares[(i+3)*c+j+3]) {
            return [squares[i*c+j], i*c+j, (i+1)*c+j+1, (i+2)*c+j+2, (i+3)*c+j+3];
          }
        }
        if ((i === 0 && j > 2) || (i < 3 && j === c-1)) {
          if (squares[i*c+j] && squares[i*c+j] === squares[(i+1)*c+j-1] && squares[i*c+j] === squares[(i+2)*c+j-2] && squares[i*c+j] === squares[(i+3)*c+j-3]) {
            return [squares[i*c+j], i*c+j, (i+1)*c+j-1, (i+2)*c+j-2, (i+3)*c+j-3];
          }
        }
        if ((i === r-1 && j < 4) || (i > 2 && j === 0)) {
          if (squares[i*c+j] && squares[i*c+j] === squares[(i-1)*c+j+1] && squares[i*c+j] === squares[(i-2)*c+j+2] && squares[i*c+j] === squares[(i-3)*c+j+3]) {
            return [squares[i*c+j], i*c+j, (i-1)*c+j+1, (i-2)*c+j+2, (i-3)*c+j+3];
          }
        }
        if ((i === r-1 && j > 2) || (i > 2 && j === c-1)) {
          if (squares[i*c+j] && squares[i*c+j] === squares[(i-1)*c+j-1] && squares[i*c+j] === squares[(i-2)*c+j-2] && squares[i*c+j] === squares[(i-3)*c+j-3]) {
            return [squares[i*c+j], i*c+j, (i-1)*c+j-1, (i-2)*c+j-2, (i-3)*c+j-3];
          }
        }
      }
    }
    return [null, null, null, null, null];
}

