import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button
      className="square" 
      onClick={props.onClick}>
    {(props.game != 1)? props.value : null}
    </button>
  ); 
}


function Connect4Button(props) {
  return (
      <button
        id={props.id}
        className="connect4Button"
        onClick={props.onClick}>
      </button>
  );
}


class Board extends React.Component {
  renderSquare(squareNum, squareVal) {
    let squareColor;
    let circleColor;
    if (this.props.game == 2) {
      let pinkSquares = [16, 32, 48, 64, 28, 42, 56, 70, 154, 168, 182, 196, 160, 176, 192, 208, 112];
      let redSquares = [0, 7, 14, 105, 119, 210, 217, 224];
      let darkBlueSquares = [20, 24, 200, 204, 76, 136, 80, 140, 84, 144, 88, 148];
      let lightBlueSquares = [36, 52, 38, 11, 3, 92, 108, 122, 165, 45, 186, 172, 188, 213, 221, 132, 116, 102, 59, 179, 96, 126, 128, 98];
      if (pinkSquares.includes(squareNum)) {
        squareColor = "pink";
      } else if (redSquares.includes(squareNum)) {
        squareColor = "red";
      } else if (darkBlueSquares.includes(squareNum)) {
        squareColor = "dodgerblue";
      } else if (lightBlueSquares.includes(squareNum)) {
        squareColor = "lightblue";
      }   
      circleColor = "transparent";
    } else if (this.props.game == 1) {
      squareColor = this.props.borderColor[this.props.game];
      circleColor = "white";
    }
    return <div id={"square"+squareNum} className="square"
                style={{border:"2px solid "+this.props.borderColor[this.props.game], backgroundColor:squareColor}}>
            <div id={"circle"+squareNum} className="circleDiv" style={{backgroundColor: circleColor}}>
              <Square 
                game={this.props.game}
                value={squareVal} 
                onClick={() => this.props.onClick(squareNum)}
                onChange={this.props.onChange}/>
            </div>
          </div>;
  }

  render() {
    let board = [];
    let rowsizes = [3, 6, 15];
    let colsizes = [3, 7, 15];
    let r = rowsizes[this.props.game];
    let c = colsizes[this.props.game];
    for (let i = 0; i < r; i++) {
      let row = [];
      for (let j = 0; j < c; j++) {
        let squareVal;
        if (!this.props.squares[this.props.game][i*c + j]) {
          squareVal = "";
        } else {
          squareVal = this.props.squares[this.props.game][i*c + j];
        }
        row.push(this.renderSquare(i*c + j, squareVal));
      }
      board.push(<div className="board-row">{row}</div>);
    }
    let renderedSquares;
    if (document.getElementById("square"+224)) {
      renderedSquares = 225;
    } else if (document.getElementById("square"+41)) {
      renderedSquares = 42;
    } else {
      renderedSquares = 9;
    }
    let shape = (this.props.game == 1)? "circle" : "square";
    for (let squareNum = 0; squareNum < renderedSquares; squareNum++) {
      if (squareNum == 20) {
        console.log("in", document.getElementById("square"+squareNum).style.background);
      }
      if (document.getElementById(shape+squareNum)) {
        if (this.props.game != 2 && this.props.squares[this.props.game][squareNum] === null) {
          document.getElementById(shape+squareNum).style.background = "white";
        } else if (this.props.game == 1) {
          if (this.props.squares[this.props.game][squareNum] === "Red") {
            if (!this.props.winningSquares.includes(squareNum)) {
              document.getElementById(shape+squareNum).style.background = "red";
            }
          } else if (this.props.squares[this.props.game][squareNum] === "Yellow") {
            if (!this.props.winningSquares.includes(squareNum)) {
              document.getElementById(shape+squareNum).style.background = "yellow";
            }
          }
        }
      }
      if (squareNum == 20) {
        console.log("out", document.getElementById("square"+squareNum).style.background);
      }
    }
    let dimension;
    if (this.props.game == 1) {
      dimension = r*50;
    } else {
      dimension = r*37;
    }
    return <div id="board" style={{height: `${dimension}px`, width: `${dimension}px`}}>{board}</div>;
  }
}


class Connect4Input extends React.Component {
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


class ScrabbleBorderLine extends React.Component {
  renderBorderSquare(value) {
    return <div className={this.props.orientation+"BorderSquare"}>{value}</div>;
  }

  render() {
    if ((this.props.game != 2)) {
      return <div></div>;
    } else {
      let border = [];
      let row = [];
      if (this.props.orientation == "horizontal") {
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
        for (let i = 0; i < 15; i++) {
          row.push(this.renderBorderSquare(letters[i]));
        }
        border.push(<div>{row}</div>);
      } else {
        for (let i = 1; i <= 15; i++) {
          border.push(<div>{this.renderBorderSquare(i)}</div>);
        }
      }
      return <div className={this.props.orientation+"Border"}>{border}</div>;
    }
  }
}


class Tiles extends React.Component {
  renderTileSquare(squareNum, squareVal, deck) {
    let pointVals= {A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10, "?": 0, "": ""};
    return <button id={"tile"+squareNum+deck} className="tileDiv"
                    onClick={() => this.props.onClick(squareNum, squareVal, deck)}>
              {squareVal}<span style={{fontSize: 12}}>{" "+pointVals[squareVal]}</span><span>{(deck == 0)? " : "+this.props.tilesLeft[squareVal] : ""}</span>
          </button>;
  }

  render() {
    if ((this.props.game != 2)) {
      return <div></div>;
    } else {
      let board = [];
      for (let i = 0; i < 3; i++) {
        let row = [];
        if (i == 0) {
          let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "?"];
          for (let j = 0; j < 9; j++) {
            row.push(this.renderTileSquare(j, letters[j], i));
          }
          row.push(<div className="lineBreak"></div>);
          for (let j = 9; j < 18; j++) {
            row.push(this.renderTileSquare(j, letters[j], i));
          }
          row.push(<div className="lineBreak"></div>);
          for (let j = 18; j < 27; j++) {
            row.push(this.renderTileSquare(j, letters[j], i));
          }
          row.push(<div className="lineBreak"></div>);
          board.push(<div id="tilePile" className="tiles-row">{row}</div>);
        } else {
          for (let j = 0; j < 7; j++) {
            let letter = (i == 1)? this.props.player1Tiles[j] : this.props.player2Tiles[j];
            row.push(this.renderTileSquare(j, letter, i));
          }
          row.push(<div className="lineBreak"></div>);
          board.push(<div className="tiles-row"><span style={{float: "left", marginRight: "5px", marginTop: "13px"
        }}>Player {i} Deck</span>{row}</div>);
        }
      }
      return <div id="tiles" style={{height: "200px", width: "650px"}}>{board}</div>;
    }
  }
}


class ScoreBoard extends React.Component {
  render() {
    if (this.props.game != 2) {
      return <div></div>;
    } else {
      return <div className="scoreBoard">
                <table>
                  <thead>
                    <tr>
                      <th className="player" style={{backgroundColor:"yellow", cursor:"pointer"}}
                          onClick={() => this.props.onClick(0)}>
                        Player 1</th>
                      <th className="player" style={{backgroundColor:"orange", cursor:"pointer"}}
                          onClick={() => this.props.onClick(1)}>
                        Player 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><center>{this.props.score[0]}</center></td>
                      <td><center>{this.props.score[1]}</center></td>
                    </tr>
                  </tbody>
                </table>
            </div>;
    }
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: [Array(9).fill(null), Array(42).fill(null), Array(225).fill(null)],
        row: null,
        col: null,
        score: [0, 0],
        scrabbleWord: "",
        wordMultiplier: 1,
        scrabblePoints: 0,
        player1IsNext: true,
        player1DeckSize: 0,
        player2DeckSize: 0,
        refill: 7,
        player1Tiles: Array(7).fill(""),
        player2Tiles: Array(7).fill(""),
        tilesLeft: {A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1, "?": 2, "": ""}
      }],
      stepNumber: 0,
      squareNum: 0,
      squareNums: [],
      scrabbleLetter: "",
      game: 2, // 0 = Tic-Tac-Toe, 1 = Connect Four, 2 = Scrabble
      chronological: true,
      newTurn: false,
    };
  }

  handleSquareClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    if (this.state.game == 0) {
      const newSquares = current.squares[0].slice();
      if (calculateTTTWinner(newSquares)[0] || newSquares[i]) {
        return;
      }
      newSquares[i] = current.player1IsNext? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: [newSquares, this.state.history[1], this.state.history[2]],
          row: Math.floor(i/3),
          col: i % 3,
          score: [0, 0],
          scrabbleWord: "",
          player1IsNext: !current.player1IsNext,
        }]),
        stepNumber: history.length,
      });
    } else if (this.state.game == 2) {
      if (this.state.scrabbleLetter == "") {
        return;
      } else {
        this.handleScrabbleText(i);
      }
    }
  }

  handleTileClick(squareNum, squareVal, deck) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    let newHistory = history.slice();
    let newRefill = current.refill;
    if (deck == 0) {
      if (current.tilesLeft[squareVal] > 0) {
        if (current.player1DeckSize < 7 || current.player2DeckSize < 7) {
          let newPlayer1Tiles = current.player1Tiles.slice();
          let newPlayer1DeckSize = current.player1DeckSize;
          let newPlayer2Tiles = current.player2Tiles.slice();
          let newPlayer2DeckSize = current.player2DeckSize;
          if (current.player1DeckSize < 7) {
            for (let i = 0; i < 7; i++) {
              if (newPlayer1Tiles[i] == "") {
                newPlayer1Tiles[i] = squareVal;
                newPlayer1DeckSize++;
                break;
              }
            }
          } else if (current.player2DeckSize < 7) {
            for (let i = 0; i < 7; i++) {
              if (newPlayer2Tiles[i] == "") {
                newPlayer2Tiles[i] = squareVal;
                newPlayer2DeckSize++;
                break;
              }
            }
          } 
          let newTilesLeft = current.tilesLeft;
          newTilesLeft[squareVal] = current.tilesLeft[squareVal]-1;

          let newScrabbleWord; 
          if (newPlayer1DeckSize == 7 && newPlayer2DeckSize == 7) {
            newScrabbleWord = "Tiles picked";
          } else {
            newScrabbleWord = `${squareVal} picked`;
          }
          newHistory = newHistory.concat([{
            squares: current.squares,
            row: current.row,
            col: current.col,
            score: current.score,
            scrabbleWord: newScrabbleWord,
            wordMultiplier: current.wordMultiplier,
            scrabblePoints: current.scrabblePoints,
            player1IsNext: current.player1IsNext,
            player1DeckSize: newPlayer1DeckSize,
            player2DeckSize: newPlayer2DeckSize,
            player1Tiles: newPlayer1Tiles,
            player2Tiles: newPlayer2Tiles,
            refill: newRefill,
            tilesLeft: newTilesLeft}]);
          this.setState({
            history: newHistory,
            stepNumber: newHistory.length,
          });
        } 
        if (current.tilesLeft[squareVal] == 0) {
          document.getElementById("tile"+squareNum+deck).style.background = "grey"; 
        } 
      }
    } else {
      if ((deck == 1) != current.player1IsNext) {
        return;
      } else {
        if (current.player1DeckSize == 7 && current.player2DeckSize == 7) {
          if (current.refill == 7) {
            newHistory = newHistory.slice(0, 1).concat(newHistory.slice(newHistory.length-1));;
          }
          newHistory[newHistory.length-1].refill = 1;
          this.setState({
            history: newHistory,
            stepNumber: newHistory.length,
            scrabbleLetter: squareVal,
            squareNum: squareNum,
          });
        } else {
          let playerTiles = (deck == 1)? current.player1Tiles : current.player2Tiles;
          if (playerTiles[squareNum] != "") {
          if (current.player)
            newRefill = current.refill + 1;
            newHistory = newHistory.concat([{
              squares: current.squares,
              row: current.row,
              col: current.col,
              score: current.score,
              scrabbleWord: current.scrabbleWord,
              wordMultiplier: current.wordMultiplier,
              scrabblePoints: current.scrabblePoints,
              player1IsNext: current.player1IsNext,
              player1DeckSize: current.player1DeckSize,
              player2DeckSize: current.player2DeckSize,
              player1Tiles: current.player1Tiles,
              player2Tiles: current.player2Tiles,
              refill: newRefill,
              tilesLeft: current.tilesLeft
            }]);
            this.setState({history: newHistory,
                          stepNumber: newHistory.length,
                          scrabbleLetter: squareVal,
                          squareNum: squareNum,});
          }
        }
      }
    }
  }

  handleConnect4Input(j) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const newSquares = current.squares[1].slice();
    if (calculateConnect4Winner(newSquares)[0]) {
      return;
    }
    let r = 6;
    let c = 7;
    let rowX, colX;
    for (let i = r-1; i >= 0; i--) {
      if (newSquares[i*c+j] === null) {
        if (current.player1IsNext) {
          newSquares[i*c+j] = 'Red';
        } else {
          newSquares[i*c+j] = 'Yellow';
        }
        rowX = i; 
        colX = j;
        break;
      } else if (i == 0) {
        return;
      }
    }
    this.setState({
      history: history.concat([{
        squares: [current[0], newSquares, current[2]],
        row: rowX,
        col: colX,      
        score: [0, 0],
        scrabbleWord: "",
        player1IsNext: !current.player1IsNext
      }]),
      stepNumber: history.length,
    });
  }

  handleScrabbleText(i) {
    let letter = this.state.scrabbleLetter;
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const newSquares = current.squares[2].slice();
    newSquares[i] = letter;
    let pointVals= {A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10, " ": 0};
    let letterValue = pointVals[letter];
    let letterMultiplier = 1;
    if (document.getElementById("square"+i).style.backgroundColor === "lightblue") {
      letterMultiplier = 2;
    } else if (document.getElementById("square"+i).style.backgroundColor === "dodgerblue") {
      letterMultiplier = 3;
    }
    let newWordMultiplier = current.wordMultiplier;
    if (document.getElementById("square"+i).style.backgroundColor === "pink") {
      newWordMultiplier = 2;
    } else if (document.getElementById("square"+i).style.backgroundColor === "red") {
      newWordMultiplier = 3;
    }
    let newPlayer1Tiles = current.player1Tiles.slice();
    let newPlayer2Tiles = current.player2Tiles.slice();
    let newPlayer1DeckSize = current.player1DeckSize;
    let newPlayer2DeckSize = current.player2DeckSize;
    if (current.player1IsNext) {
      newPlayer1Tiles[this.state.squareNum] = "";
      newPlayer1DeckSize -= 1;
    } else {
      newPlayer2Tiles[this.state.squareNum] = "";
      newPlayer2DeckSize -= 1;
    }
    let newScrabbleWord = current.scrabbleWord.localeCompare("Tiles picked") == 0? "" : current.scrabbleWord;
    let newHistory = history.slice(0, history.length-1).concat([{
      squares: [current[0], current[1], newSquares],  
      score: current.score,
      scrabbleWord: (this.state.newTurn? "" : newScrabbleWord) + letter,
      wordMultiplier: newWordMultiplier,
      scrabblePoints: current.scrabblePoints + (letterValue * letterMultiplier),
      player1IsNext: current.player1IsNext,
      player1DeckSize: newPlayer1DeckSize,
      player2DeckSize: newPlayer2DeckSize,
      player1Tiles: newPlayer1Tiles,
      player2Tiles: newPlayer2Tiles,
      refill: current.refill,
      tilesLeft: current.tilesLeft
    }])
    this.setState({
      history: newHistory,
      stepNumber: newHistory.length,
      newTurn: false,
      squareNums: this.state.squareNums.concat(i),
      scrabbleLetter: ""
    });
  }

  handleTurnChange(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const fullWordStep = history[this.state.stepNumber-this.state.squareNums.length-1];
    let newScrabbleWord = fullWordStep.scrabbleWord;
    let newSquareNums = this.state.squareNums.slice();
    let oldSquareNums = this.state.squareNums.slice();
    if (newSquareNums.length == 1) {
      if (current.squares[2][newSquareNums[0]-1] != null) {
        newSquareNums[1] = newSquareNums[0]-1;
      } else if (current.squares[2][newSquareNums[0]+1] != null) {
        newSquareNums[1] = newSquareNums[0]+1;
      } else if (current.squares[2][newSquareNums[0]-15] != null) {
        newSquareNums[1] = newSquareNums[0]-15;
      } else if (current.squares[2][newSquareNums[0]+15] != null) {
        newSquareNums[1] = newSquareNums[0]+15;
      }
    }
    let squareNums = newSquareNums;
    let gap;
    if (squareNums[1] - squareNums[0] < 15) {
      gap = 1;
    } else {
      gap = 15;
    }
    let pointVals= {A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10, BLANK: 0};
    let newWordMultiplier = current.wordMultiplier;
    let newScrabblePoints = current.scrabblePoints;
    for (let i = 1; i <= squareNums.length; i++) {
      if (squareNums[i] - squareNums[i-1] == gap) {
        continue;
      } else {
        let half1 = newScrabbleWord.substring(0, i);
        let half2 = newScrabbleWord.substring(i, newScrabbleWord.length);
        newScrabbleWord = "";
        newScrabbleWord += half1;
        for (let j = squareNums[i-1]+1; j < squareNums[i]; j+=gap) {
          newScrabbleWord += current.squares[2][j];
          newScrabblePoints += pointVals[current.squares[2][j]];
        }
        newScrabbleWord += half2;
      }
    }
    for (let i = this.state.squareNums[0]-gap; i >= 0; i-=gap) {
      if (current.squares[2][i] != null) {
        newScrabbleWord = current.squares[2][i] + newScrabbleWord;
        newScrabblePoints += pointVals[current.squares[2][i]];
      } else {
          break;
      }
    }
    for (let i = this.state.squareNums[squareNums.length-1]+gap; i < 225; i+= gap) {
      if (current.squares[2][i] != null) {
        newScrabbleWord = newScrabbleWord + current.squares[2][i];        
        newScrabblePoints += pointVals[current.squares[2][i]];      
      } else {
          break;
      }
    }
    let player1Score = i? current.score[0] + newScrabblePoints*newWordMultiplier : current.score[0];
    let player2Score = i? current.score[1] : current.score[1] + newScrabblePoints*newWordMultiplier;
    history[this.state.stepNumber-this.state.squareNums.length-1].scrabbleWord = newScrabbleWord;
    let newHistory = history.slice(0, history.length-2*oldSquareNums.length).concat(history[this.state.stepNumber-oldSquareNums.length-1]).concat([{
      squares: current.squares,
      row: current.row,
      col: current.row,   
      score: [player1Score, player2Score],
      scrabbleWord: "Tiles picked",
      wordMultiplier: 1,
      scrabblePoints: 0,
      player1IsNext: !i,
      player1DeckSize: current.player1DeckSize,
      player2DeckSize: current.player1DeckSize,
      player1Tiles: current.player1Tiles,
      player2Tiles: current.player2Tiles,
      refill: current.refill,
      tilesLeft: current.tilesLeft
    }]);
    this.setState({ history: newHistory,
                    stepNumber: newHistory.length,
                    newTurn: true,
                    squareNums: []
                  });
  }

  jumpTo(move) {
    if (this.state.game == 1) {
      for (let squareNum = 0; squareNum < 42; squareNum++) {
        if (document.getElementById("square"+squareNum)) {
            document.getElementById("square"+squareNum).style.background = "dodgerblue";
        }
      }
    }
    this.setState({
      stepNumber: move,
    });
  }

  handleGameChange = (event) => {
    this.setState({
      history: [{
        squares: [Array(9).fill(null), Array(42).fill(null), Array(225).fill(null)],
        row: null,
        col: null,
        score: [0, 0],
        scrabbleWord: "",
        wordMultiplier: 1,
        scrabblePoints: 0,
        player1IsNext: true,
        player1DeckSize: 0,
        player2DeckSize: 0,
        refill: 7,
        player1Tiles: Array(7).fill(""),
        player2Tiles: Array(7).fill(""),
        tilesLeft: {A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1, "?": 2, "": ""}
      }],
      stepNumber: 0,
      squareNum: 0,
      squareNums: [],
      scrabbleLetter: "",
      game: event.target.value,
      chronological: true,
      newTurn: false,
    });
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNumber+1);;
    const current = history[history.length-1];
    let [winner, a, b, c, d] = [null, null, null, null];
    if (this.state.game == 0) {
      [winner, a, b, c] = calculateTTTWinner(current.squares[0]);
    } else if (this.state.game == 1) {
      [winner, a, b, c, d] = calculateConnect4Winner(current.squares[1]);
    } else if (this.state.game == 2) {
      winner = calculateScrabbleWinner(current.score, current.tilesLeft, current.player1DeckSize, current.player2DeckSize);
    }

    let shape = (this.state.game == 1)? "circle" : "square";
    let moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' (' + ((this.state.game == 2)? step.scrabbleWord : step["row"] + ',' + step["col"]) + ')' :
        'Go to game start';
      let historyList = document.getElementById("historyList");
      let entry = document.getElementById(`step${move}`);
      if (entry) {
        historyList.scrollTo(historyList.scrollLeft + entry.offsetLeft + entry.offsetWidth, 0);
      }
      return (<li key={move}>
          <button id={"step" + move} style={{fontSize:move? "13px": "15px", fontStyle:move? "none": "italic"}} className="inactive history" onClick={() => { 
              if (winner) {
                document.getElementById("circle"+a).style.background = "white";
                document.getElementById("circle"+b).style.background = "white";
                document.getElementById("circle"+c).style.background = "white";
                if (d) {
                  document.getElementById("circle"+d).style.background = "white";
                } 
                if (this.state.game == 0) {
                    document.getElementById("square"+a).style.background = "white";
                    document.getElementById("square"+b).style.background = "white";
                    document.getElementById("square"+c).style.background = "white";
                    if (d) {
                      document.getElementById(shape+d).style.background = "white";
                  }
                }
              }
              if (document.getElementsByClassName("active")[0]) { 
                document.getElementsByClassName("active")[0].style.fontWeight = "normal";
                document.getElementsByClassName("active")[0].classList.add("inactive");
                document.getElementsByClassName("active")[0].classList.remove("active");
              }
              document.getElementById("step"+move).style.fontWeight = "bold";
              document.getElementById("step"+move).classList.add("active");
              document.getElementById("step"+move).classList.remove("inactive");
              this.jumpTo(move);
            }}>{desc}</button>  
        </li>);
      })
    if (!this.state.chronological) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      document.getElementById("circle"+a).style.background = "green";
      document.getElementById("circle"+b).style.background = "green";
      document.getElementById("circle"+c).style.background = "green";
      if (d) {
        document.getElementById("circle"+d).style.background = "green";
      }
      if (this.state.game != 1) {
        document.getElementById("square"+a).style.background = "green";
        document.getElementById("square"+b).style.background = "green";
        document.getElementById("square"+c).style.background = "green";
        if (d) {
          document.getElementById(shape+d).style.background = "green";
        }
      }
    } else {
      if ((this.state.game === 0 && this.state.stepNumber === 9) || (this.state.game === 1 && this.state.stepNumber === 42)) {
        status = 'Draw';
      } else {
          let player1 = ['X', 'Red', "Player 1"];
          let player2 = ['O', 'Yellow', "Player 2"];
          status = 'Turn: ' + (current.player1IsNext? player1[this.state.game] : player2[this.state.game]);
      }
    }

    let history_list = this.state.chronological? <ol id="historyList">{moves}</ol> : <ol id="historyList" reversed>{moves}</ol>;

    return (
      <div className="game">
        <div className="game-board">
            <Connect4Input
              game={this.state.game}
              onClick={(i) => this.handleConnect4Input(i)} />
            <ScrabbleBorderLine
              game={this.state.game}
              orientation="horizontal"/>
          <div className="lineBreak"></div>
          <div id="boardContainer">
            <ScrabbleBorderLine
              game={this.state.game}
              orientation="vertical"/>
            <div style={{alignSelf:"start"}}>
              <Board
                game={this.state.game}
                squares={current.squares}
                borderColor={["#999", "dodgerblue", "#999"]}
                winningSquares={[a, b, c, d]}
                onClick={(squareNum) => this.handleSquareClick(squareNum)}
                onChange={this.handleScrabbleText} />
            </div>
            <ScrabbleBorderLine
              game={this.state.game}
              orientation="vertical"/>
          </div>
            <ScrabbleBorderLine
              game={this.state.game}
              orientation="horizontal"/>
        </div>
        <div className="game-info">
            <><div>
              <center><form>
                <select value={this.state.game} onChange={this.handleGameChange}>
                  <option value={0}>Tic-Tac-Toe</option>
                  <option value={1}>Connect Four</option>
                  <option value={2}>Scrabble</option>
                </select>
              </form></center>
           </div></>
            <div id="status"><center>{status}</center></div>
            <div id="scoreContainer">
              <ScoreBoard
                game={this.state.game}
                score={current.score}
                onClick={(i) => {
                  if (current.player1DeckSize == 7 && current.player2DeckSize == 7) {
                    this.handleTurnChange(i);
                  }
                }}/>
              {this.state.game == 2 && <div id="pointsMultDiv">
                <div className="pointsMult" style={{backgroundColor: "lightblue"}}>2x Letter value</div>
                <div className="pointsMult" style={{backgroundColor: "dodgerblue"}}>3x Letter value</div>
                <div className="lineBreak"></div>
                <div className="pointsMult" style={{backgroundColor: "pink"}}>2x Word value</div>
                <div className="pointsMult" style={{backgroundColor: "red"}}>3x Word value</div>
                <div className="lineBreak"></div></div>}
            </div>
            <Tiles 
              game={this.state.game}
              squares={current.squares}
              borderColor={["#999", "dodgerblue", "#999"]}
              onClick={(squareNum, squareVal, deck) => this.handleTileClick(squareNum, squareVal, deck)}
              player1Tiles={current.player1Tiles}
              player2Tiles={current.player2Tiles}
              tilesLeft={current.tilesLeft}/>
            <center><button id="historyToggle" style={{marginTop: "5px", cursor: "pointer"}} onClick={() => this.setState({ chronological: !this.state.chronological })}>Toggle history order</button></center>
            {history_list}
          </div>
        </div>
    );
  }
}


function calculateTTTWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return [null, null, null, null];
}


function calculateConnect4Winner(squares) {
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


function calculateScrabbleWinner(score, tilesLeft, player1DeckSize,player2DeckSize) {
  if (player1DeckSize == 0 || player2DeckSize == 0) {
    let hope = false;
    for (let i = 0; i < 27; i++) {
      if (tilesLeft[i] > 0) {
        hope = true;
      }
    }
    if (!hope) {
      if (score[0] > score[1]) {
        return "Player 1";
      } else if (score[0] < score[1]) {
        return "Player 2";
      }
    } else {
      return null;
    }
  } 
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
