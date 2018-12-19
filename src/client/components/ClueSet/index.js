import React from 'react';

import Heading from '../Common/Heading';
import { dataReady } from '../../lib/utils';

import Clue from '../Clue';

import style from './style.css';

function ClueSet({ type, clues }) {
  return (
    <section className={style.clueSet}>
      <Heading color="black" level="h4">{type.toUpperCase()}</Heading>
      <ul className={style.clueList}>
        {dataReady(clues) && clues.map((obj, i) => {
          const { clue, meta: { number, format } } = obj;
          return (
            <Clue
              key={i}
              clue={clue}
              number={number}
              format={format}
              className={style.clues}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClueSet;
