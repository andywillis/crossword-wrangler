import React from 'react';

import ClueSet from '../ClueSet';

import style from './style.css';

function Clues({ clues: { across, down } }) {
  return (
    <div className={style.clues}>
      <ClueSet type="across" clues={across} />
      <ClueSet type="down" clues={down} />
    </div>
  );
}

export default Clues;
