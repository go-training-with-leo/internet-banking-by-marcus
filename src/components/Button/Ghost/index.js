import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Ghost = ({
  type,
  size,
  color,
  bgColor,
  startIcon,
  endIcon,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      className={classNames('button ghost', [className, size, bgColor, color])}
      onClick={onClick}
      type={type}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

Ghost.defaultProps = {
  type: 'button',
  size: 'normal',
  startIcon: undefined,
  children: undefined,
  endIcon: undefined,
  color: 'color-gray',
  className: '',
  onClick: undefined,
};

Ghost.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['small', 'normal']),
  color: PropTypes.oneOf(['color-red', 'color-gray']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Ghost;
