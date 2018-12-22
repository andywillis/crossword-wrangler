import React from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function Button({ dataId, size, selected, children, handleChange }) {

  const buttonClass = compileClasses({
    [style.button]: true,
    [style[size]]: true,
    [style.selected]: selected && true
  });

  return (
    <button
      type="button"
      data-id={dataId}
      className={buttonClass}
      onClick={handleChange}
    >{children}
    </button>
  );

}

export default Button;
