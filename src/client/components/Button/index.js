import React, { Component } from 'react';
import compileClasses from 'classnames';

import style from './style.css';

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = { on: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { toggleSolution } = this.props;
    this.setState(prev => ({ on: !prev.on }));
    toggleSolution();
  }

  render() {

    const { on } = this.state;
    const { children } = this.props;
    const buttonClass = compileClasses(style.button, on && style.on);

    return (
      <button
        type="button"
        className={buttonClass}
        onClick={this.handleClick}
      >{children} {on ? 'off' : 'on'}
      </button>
    );

  }
}

export default Button;
