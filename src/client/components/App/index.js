import React from 'react';

import Crossword from '../Crossword';

import style from './style.css';

function App() {
  return (
    <div className={style.app}>
      <header />
      <Crossword />
      <footer />
    </div>
  );
}

export default App;
