import React, { Component } from 'react'
import Square from './Square';

class Board extends Component {
    renderSquare(i){
        const isBold = (this.props.boldSquares[i])? true : false;
        return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} isBold={isBold}/>
    }

    render() {
        const boards = [];
        for (let i = 0; i < 3; i++){
            const rows = [];
            for (let j = 0; j < 3; j++){
                rows.push(
                    this.renderSquare(i * 3 + j)
                )
            }
            boards.push(
                <div key={i} className="board-row">
                       {rows}     
                </div>
            );
        }
        return (
            <div>
                {boards}
            </div>
        )
    }
}

export default Board
