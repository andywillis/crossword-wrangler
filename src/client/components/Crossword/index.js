import React from 'react';

import Clues from '../Clues';
import Grid from '../Grid';

import style from './style.css';

function Crossword({ squares, clues, ...rest }) {
  return (
    <main className={style.crossword}>
      <Clues clues={clues} {...rest} />
      <Grid squares={squares} {...rest} />
    </main>
  );
}

export default Crossword;
