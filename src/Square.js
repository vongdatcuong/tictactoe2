import React, { Component } from 'react'

function Square(props) {
    return (
        <button className={"square ".concat((props.isBold)? ((props.value == 'X')? ' x-color': ' o-color') : '')} 
            onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}

export default Square
