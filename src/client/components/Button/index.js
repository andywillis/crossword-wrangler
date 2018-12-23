import React from 'react';
import compileClasses from 'classnames';

import style from './style.css';

function Button(props) {

  const {
    dataId, dataType, dataName, size,
    selected, children, handleChange
  } = props;

  const buttonClass = compileClasses({
    [style.button]: true,
    [style[size]]: true,
    [style.selected]: selected && true
  });

  return (
    <button
      type="button"
      data-id={dataId}
      data-type={dataType}
      data-name={dataName}
      className={buttonClass}
      onClick={handleChange}
    >{children}
    </button>
  );

}

export default Button;
