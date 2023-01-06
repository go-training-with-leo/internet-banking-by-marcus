import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Cancel } from 'assets/images';

import './style.scss';

const Modal = ({ title, cancel, isClose, children, clickOutSide }) => {
  const [toggle, setToggle] = useState(isClose);

  const handleToggle = () => {
    setToggle(true);
  };

  return (
    <div
      className={classNames('modal-container', { closeModal: toggle })}
      role='dialog'
      onClick={() => {
        if (clickOutSide) setToggle(true);
      }}
    >
      <div
        className='modal'
        onClick={(e) => {
          e.stopPropagation();
        }}
        role='dialog'
      >
        <div className='modal-header'>
          <span className='title'>{title}</span>
          {cancel && (
            <div
              className='cancel'
              role='button'
              tabIndex='0'
              onClick={handleToggle}
            >
              <Cancel width={20} height={20} />
              <span>CANCEL</span>
            </div>
          )}
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  cancel: false,
  isClose: false,
  children: undefined,
  clickOutSide: false,
};

Modal.propTypes = {
  cancel: PropTypes.bool,
  isClose: PropTypes.bool,
  children: PropTypes.node,
  clickOutSide: PropTypes.bool,
};

export default Modal;
