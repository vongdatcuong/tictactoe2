import React, { Component } from 'react'
import Board from './Board'

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    move: null
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            sortAsc: true
        }
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = (this.state.xIsNext)? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                move: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    handleSort(){
        this.setState({
            sortAsc: !this.state.sortAsc
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const boldSquares = {};
        const sortStr = (!this.state.sortAsc)? 'Sort Ascending' : 'Sort Descending';

        const moves = history.map((step, move) => {
            const desc = move? 'Go to move #' + move  + ` ->   At: (Row: ${parseInt(step.move /3 + 1)}, Column: ${parseInt(step.move % 3 + 1)})` 
                            + `, Player: ${(move % 2 != 0)? 'X' : 'O'}`
                        : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        if (!this.state.sortAsc){
            moves.reverse();
        }

        let status;
        if (winner){
            winner.forEach((cell, index) => {
                boldSquares[cell] = true;
            })
            status = 'Winner: ' + current.squares[winner[0]];
        } else {
            // Bold last move
            if (current.move != null){
                boldSquares[current.move] = true;
            }
            // Draw
            if (this.state.stepNumber == 9){
                status = 'Draw';
            } else {
                status = 'Next player: ' + ((this.state.xIsNext)? 'X' : 'O');
            }
        }
        return (
            <div className="game">
                <div className="game-board">
                    <div className="status">
                        {status}
                    </div>
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        boldSquares={boldSquares}
                    />
                </div>
                <div className="game-info">
                    
                </div>

                <div className="sortWrapper">
                    <h3>Sort</h3>
                    <button onClick={() => this.handleSort()}>{sortStr}</button>
                </div>

                <div className="moveHistory">
                    <h3>History</h3>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
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
        return lines[i];
      }
    }
    return null;
}

function compareAsc( a, b ) {
    return a - b;
}

function compareDesc( a, b ) {
    return b - a;
}

export default Game
