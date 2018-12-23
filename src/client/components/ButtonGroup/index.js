import React, { Component } from 'react';
import compileClasses from 'classnames';

import style from './style.css';

class ButtonGroup extends Component {

  constructor(props) {
    super(props);
    const buttons = React.Children.map(props.children, (child, i) => {
      return {
        ...child,
        props: {
          ...child.props,
          dataId: i,
          handleChange: this.handleChange.bind(this)
        }
      };
    });
    this.state = { buttons };
    this.handleChange = this.handleChange.bind(this);
//    this.findSelectedText = this.findSelectedText.bind(this);
  }

  static getSelectedButton(id, buttons) {
    const button = buttons.find(button => button.props.dataId === id);
    const { selected } = button.props;
    return { ...button, props: { ...button.props, selected: !selected } };
  }

  static getUnselectedButtons(id, buttons) {
    return buttons
      .filter(button => button.props.dataId !== id)
      .map(button => ({ ...button, props: { ...button.props, selected: false } }));
  }

  updateButtons(id) {
    const { buttons: copy } = { ...this.state };
    const selectedButton = ButtonGroup.getSelectedButton(Number(id), copy);
    const buttons = ButtonGroup.getUnselectedButtons(Number(id), copy);
    buttons.splice(Number(id), 0, selectedButton);
    this.setState({ buttons });
  }

  handleChange(e) {
    const { dataset: { id, type, name } } = e.target;
    const { handleChange } = this.props;
    this.updateButtons(id);
    handleChange(type, name);
  }

  findSelectedText() {
    const { buttons } = this.state;
    const button = buttons.find(button => button.props.selected);
    return button.props.children;
  }

  render() {
    const { print, align, hide } = this.props;
    const { buttons } = this.state;

    const buttonGroupClasses = compileClasses({
      [style.buttonGroup]: true,
      [style[align]]: true,
      [style.hidden]: print && true
    });

    if (print && hide) {
      return <div className={style.printType}>{this.findSelectedText()}</div>;
    }

    return (
      <div className={buttonGroupClasses}>
        {buttons}
      </div>
    );
  }
}

export default ButtonGroup;
