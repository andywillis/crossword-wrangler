import React from 'react';

import Clues from './components/Clues';
import Grid from './components/Grid';

import './style.css';

function Crossword() {
  return (
    <main>
      <Clues />
      <Grid />
    </main>
  );
}

export default Crossword;
