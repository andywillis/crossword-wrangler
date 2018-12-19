import React from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function Square({ square }) {
  const { solution, type, number } = square;
  const classNames = compileClasses(style.square, style[type]);
  return (
    <div className={classNames}>
      <div className={style.number}>{number}</div>
      {/* <div data-solution={solution} className={style.input} /> */}
    </div>
  );
}

export default Square;
