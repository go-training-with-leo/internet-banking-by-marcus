import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Wrapper = ({ title, children }) => {
  return (
    <div className='wrapper'>
      <div className='wrapper-header'>
        <span className='title'>{title}</span>
      </div>
      <div className='wrapper-body'>{children}</div>
    </div>
  );
};

Wrapper.defaultProps = {
  children: undefined,
};

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Wrapper;
