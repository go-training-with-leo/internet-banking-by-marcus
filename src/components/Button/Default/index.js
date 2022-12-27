import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'components/Button/Default/style.scss';

const Default = ({
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
      className={classNames('button', [className, size, bgColor, color])}
      onClick={onClick}
      type={type}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

Default.defaultProps = {
  type: 'button',
  size: 'normal',
  startIcon: undefined,
  children: undefined,
  endIcon: undefined,
  color: 'color-white',
  bgColor: 'bg-red',
  className: '',
  onClick: undefined,
};

Default.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['small', 'normal']),
  color: PropTypes.oneOf(['color-white', 'color-gray']),
  bgColor: PropTypes.oneOf(['bg-red', 'bg-black']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Default;
