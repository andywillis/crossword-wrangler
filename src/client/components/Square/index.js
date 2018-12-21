import React from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function Square({ showSolution, square, deviceWidth, print, noOfSquares }) {

  const { solution, type, number } = square;
  const classNames = compileClasses(style.square, style[type]);

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
    <div className={classNames}>
      <div className={style.number}>{number}</div>
      {/* <div data-solution={solution} className={style.input} /> */}
    </div>
  );

}

export default Square;
