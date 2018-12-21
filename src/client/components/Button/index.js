import React, { Component } from 'react';
import compileClasses from 'classnames';

import style from './style.css';

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleClick } = this.props;
    this.setState(prev => ({ on: !prev.on }));
    handleClick();
  }

  render() {

    const { selected } = this.state;
    const { children, size } = this.props;

    const buttonClass = compileClasses({
      [style.button]: true,
      [style[size]]: true,
      [style.selected]: selected && true
    });

    return (
      <button
        type="button"
        className={buttonClass}
        onClick={this.handleClick}
      >{children}
      </button>
    );

  }
}

export default Button;
