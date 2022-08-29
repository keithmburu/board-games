import React from 'react';


export class ScrabbleBorderLine extends React.Component {
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


export class Tiles extends React.Component {
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


export class ScoreBoard extends React.Component {
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


export function calculateScrabbleWinner(score, tilesLeft, player1DeckSize,player2DeckSize) {
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