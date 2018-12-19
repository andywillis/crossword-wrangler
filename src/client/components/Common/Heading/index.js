import React, { createElement } from 'react';
import { Link } from 'react-router-dom';
import compileClasses from 'classnames';

import style from './style.css';


function createHeadingLevel(classes, level, children) {
  return createElement(level, { className: classes }, children);
}

function wrapLink(link, heading) {
  return (
    <Link to={{ pathname: `/entry/${link}` }}>{heading}</Link>
  );
}

function getHeading(classes, headingProps) {
  const { link, level, children } = headingProps;
  const heading = createHeadingLevel(classes, level, children);
  if (link) return wrapLink(link, heading);
  return heading;
}


/**
 * Heading component
 *
 * @param {string} level = heading level - required
 * @param {string?} color: green/default (blue) - optional
 * @param {string?} link: URI - optional
 * @returns JSX
 */
function Heading(props) {

  const { color, highlightHover, ...headingProps } = props;

  const classes = compileClasses({
    [style.heading]: true,
    [style.highlightHover]: highlightHover && true,
    [style.default]: !color,
    [style[color]]: color && true
  });

  return getHeading(classes, headingProps);

}

export default Heading;
