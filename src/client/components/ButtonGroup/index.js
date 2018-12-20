import React from 'react';

import style from './style.css';

function ButtonGroup({ print, children }) {
  const buttonGroupClasses = print ? style.hidden : style.buttonGroup;
  return <div className={buttonGroupClasses}>{children}</div>;
}

export default ButtonGroup;
