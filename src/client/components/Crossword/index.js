import React from 'react';

import Clues from '../Clues';
import Grid from '../Grid';

import style from './style.css';

function Crossword({ squares, clues }) {
  return (
    <main className={style.crossword}>
      <Clues clues={clues} />
      <Grid squares={squares} />
    </main>
  );
}

export default Crossword;
