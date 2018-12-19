import React from 'react';

import style from './style.css';

function Clues({ clue, number, format }) {
  return (
    <li className={style.clue}>
      <div className={style.number}>{number}</div>
      {clue} ({format})
    </li>
  );
}

export default Clues;
