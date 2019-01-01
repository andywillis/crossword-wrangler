import React from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function Square(props) {

  const {
    square: { x, y, solution, type, number },
    showSolution,
    squareId,
    selected,
    deviceWidth,
    print,
    noOfSquares,
    handleClick,
    handleKeyUp
  } = props;

  const classNames = compileClasses({
    [style.square]: true,
    [style[type]]: type && true,
    [style.selected]: selected && true
  });

  let letterSize;

  if (noOfSquares === '13') {
    letterSize = deviceWidth <= 1024 ? 1.7 : 2;
    const minus = deviceWidth <= 1024 ? -0.2 : 0.06;
    letterSize = print ? Math.round((letterSize - minus) * 10) / 10 : letterSize;
  }

  if (noOfSquares === '19') {
    letterSize = deviceWidth <= 1024 ? 1.2 : 1.4;
    const minus = deviceWidth <= 1024 ? -0.2 : 0.06;
    letterSize = print ? Math.round((letterSize - minus) * 10) / 10 : letterSize;
  }

  document.documentElement.style.setProperty('--letter-size', `${letterSize}em`);

  if (showSolution) {
    return (
      <div className={classNames}>
        <div className={style.number}>{number}</div>
        <div className={style.letter}>{solution}</div>
      </div>
    );
  }

  return (
    <div
      role="presentation"
      className={classNames}
      data-id={squareId}
      data-x={x}
      data-y={y}
      onClick={solution && handleClick}
      onKeyUp={solution && handleKeyUp}
    >
      <div className={style.number}>{number}</div>
      {/* <div data-solution={solution} className={style.input} /> */}
    </div>
  );

}

export default Square;
