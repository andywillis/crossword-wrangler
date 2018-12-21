import React, { Component } from 'react';
import { dataReady } from '../../lib/utils';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import Square from '../Square';

import style from './style.css';

function calcWidth(print, deviceWidth, noOfSquares) {
  let width;
  if (noOfSquares === '13') {
    width = deviceWidth <= 1024 ? 38 : 50;
    const minus = deviceWidth <= 1024 ? 2 : 14;
    width = print ? width - minus : width;
  }
  if (noOfSquares === '19') {
    width = deviceWidth <= 1024 ? 27 : 34;
    const minus = deviceWidth <= 1024 ? 1 : 9;
    width = print ? width - minus : width;
  }
  return width;
}

class Grid extends Component {

  constructor(props) {
    super(props);
    this.state = { showSolution: false };
    this.toggleSolution = this.toggleSolution.bind(this);
  }

  toggleSolution() {
    this.setState(prev => ({ showSolution: !prev.showSolution }));
  }

  render() {

    const { width: noOfSquares, squares, print, deviceWidth } = this.props;
    const { showSolution } = this.state;

    let squareWidth;

    if (dataReady(squares)) {
      squareWidth = calcWidth(print, deviceWidth, noOfSquares);
      document.documentElement.style.setProperty('--square-width', `${squareWidth}px`);
      document.documentElement.style.setProperty('--grid-noOfSquares', noOfSquares);
    }

    return (
      <div className={style.wrapper}>

        <div className={style.grid}>
          {dataReady(squares) && squares.map((square, i) => {
            return (
              <Square
                showSolution={showSolution}
                key={i}
                square={square}
                print={print}
                deviceWidth={deviceWidth}
                noOfSquares={noOfSquares}
              />
            );
          })}
        </div>

        <ButtonGroup print={print}>
          <Button
            type="button"
            toggleSolution={this.toggleSolution}
          >Toggle solution
          </Button>
        </ButtonGroup>

      </div>
    );
  }

}

export default Grid;
