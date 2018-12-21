import React from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function ButtonGroup({ print, align, children }) {

  const buttonGroupClasses = compileClasses({
    [style.buttonGroup]: true,
    [style[align]]: true,
    [style.hidden]: print && true
  });

  return <div className={buttonGroupClasses}>{children}</div>;
}

export default ButtonGroup;
