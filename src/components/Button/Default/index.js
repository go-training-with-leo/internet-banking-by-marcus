import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loader from 'components/Loader';

import 'components/Button/Default/style.scss';

const DefaultButton = ({
  type,
  ghost,
  danger,
  children,
  onClick,
  loading,
  disabled,
}) => {
  return (
    <button
      className={classNames('button', {
        danger: danger,
        ghost: ghost,
        loading: loading,
      })}
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

DefaultButton.defaultProps = {
  type: 'button',
  ghost: false,
  danger: false,
  children: undefined,
  onClick: undefined,
  loading: false,
  disabled: false,
};

DefaultButton.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  ghost: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default DefaultButton;
