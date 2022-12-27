import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'components/Loader/style.scss';

const Loader = ({ color, size }) => {
  return (
    <div className='loader-container'>
      <div className={classNames('loader', [color, size])} />
    </div>
  );
};

Loader.defaultProps = {
  color: 'default',
  size: 'normal',
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
};

export default Loader;
