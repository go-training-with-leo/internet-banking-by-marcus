import React from 'react';
import PropTypes from 'prop-types';

import { Cancel } from 'assets/images';

import './style.scss';

const Wrapper = ({ title, cancel, children }) => {
  return (
    <div className='wrapper'>
      <div className='wrapper-header'>
        <span className='title'>{title}</span>
        {cancel && (
          <div className='cancel'>
            <Cancel width={20} height={20} />
            <span>CANCEL</span>
          </div>
        )}
      </div>
      <div className='wrapper-body'>{children}</div>
    </div>
  );
};

Wrapper.defaultProps = {
  title: undefined,
  cancel: false,
  children: undefined,
};

Wrapper.propTypes = {
  title: PropTypes.string,
  cancel: PropTypes.bool,
  children: PropTypes.node,
};

export default Wrapper;
