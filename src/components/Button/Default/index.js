import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'components/Button/Default/style.scss';
import Loader from 'components/Loader';

const Default = ({ type, ghost, danger, children, onClick, loading }) => {
  return (
    <button
      className={classNames('button', {
        danger: danger,
        ghost: ghost,
        loading: loading,
      })}
      onClick={onClick}
      type={type}
      disabled={loading && true}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

Default.defaultProps = {
  type: 'button',
  ghost: false,
  danger: false,
  children: undefined,
  onClick: undefined,
  loading: false,
};

Default.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  ghost: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default Default;
