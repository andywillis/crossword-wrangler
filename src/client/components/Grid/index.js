import React, { Component } from 'react';
import { dataReady } from '../../lib/utils';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import Square from '../Square';

import style from './style.css';

function calcWidth(print, deviceWidth) {
  let width = deviceWidth <= 1024 ? 38 : 50;
  const minus = deviceWidth <= 1024 ? 2 : 14;
  width = print ? width - minus : width;
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
    const { squares, print, deviceWidth } = this.props;
    const { showSolution } = this.state;

    if (dataReady(squares)) {

      const width = calcWidth(print, deviceWidth);
      document.documentElement.style.setProperty('--square-width', `${width}px`);
    
      return (
        <div className={style.wrapper}>

          <ButtonGroup print={print}>

            <Button
              type="button"
              toggleSolution={this.toggleSolution}
            >Toggle solution
            </Button>

          </ButtonGroup>

          <div className={style.grid}>
            {dataReady(squares) && squares.map((square, i) => {
              return (
                <Square
                  showSolution={showSolution}
                  key={i}
                  square={square}
                  print={print}
                  deviceWidth={deviceWidth}
                />
              );
            })}
          </div>

        </div>
      );
    }
  }

}

export default Grid;
