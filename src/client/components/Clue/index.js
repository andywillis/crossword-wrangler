import React from 'react';

import style from './style.css';

function Clues({ clue, number }) {
  return (
    <li className={style.clue}>
      <div className={style.number}>{number}</div>
      {clue}
    </li>
  );
}

export default Clues;
