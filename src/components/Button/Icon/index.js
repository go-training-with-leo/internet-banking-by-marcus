import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import Loader from 'components/Loader';

const IconButton = ({
  type,
  ghost,
  danger,
  greyColor,
  children,
  onClick,
  loading,
}) => {
  return (
    <button
      className={classNames('button', {
        danger: danger,
        ghost: ghost,
        greyColor: greyColor,
        loading: loading,
      })}
      onClick={onClick}
      type={type}
      disabled={loading && true}
    >
      {loading ? <Loader large /> : children}
    </button>
  );
};

IconButton.defaultProps = {
  type: 'button',
  ghost: false,
  danger: false,
  greyColor: false,
  children: undefined,
  onClick: undefined,
  loading: false,
};

IconButton.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  ghost: PropTypes.bool,
  danger: PropTypes.bool,
  greyColor: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default IconButton;
