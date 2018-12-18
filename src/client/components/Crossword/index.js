import React from 'react';

import Clues from '../Clues';
import Grid from '../Grid';

import style from './style.css';

function Crossword() {
  return (
    <main className={style.crossword}>
      <Clues />
      <Grid />
    </main>
  );
}

export default Crossword;
