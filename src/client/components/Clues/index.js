import React from 'react';

import ClueSet from '../ClueSet';

import style from './style.css';

function Clues({ clues: { across, down }, print, deviceWidth }) {

  let fontSize = deviceWidth <= 1024 ? 0.9 : 1.2;
  const minus = deviceWidth <= 1024 ? -0.2 : 0.06;
  fontSize = print ? Math.round((fontSize - minus) * 10) / 10 : fontSize;
  document.documentElement.style.setProperty('--font-size', `${fontSize}em`);

  return (
    <div className={style.clues}>
      <ClueSet type="across" clues={across} />
      <ClueSet type="down" clues={down} />
    </div>
  );
}

export default Clues;
