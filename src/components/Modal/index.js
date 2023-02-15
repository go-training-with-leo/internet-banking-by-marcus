import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Cancel } from 'assets/images';

import './style.scss';
import { useTranslation } from 'react-i18next';

const Modal = ({ title, cancel, setToggle, children, clickOutSide, large }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Cards' });
  return (
    <div
      className={classNames('modal-container')}
      role='dialog'
      onClick={() => {
        if (clickOutSide) setToggle();
      }}
    >
      <div
        className={classNames('modal', { large: large })}
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
              onClick={() => setToggle(false)}
            >
              <Cancel width={20} height={20} />
              <span>{t('cancel')}</span>
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
  setToggle: () => {},
  children: undefined,
  clickOutSide: false,
  large: false,
};

Modal.propTypes = {
  cancel: PropTypes.bool,
  setToggle: PropTypes.func,
  children: PropTypes.node,
  clickOutSide: PropTypes.bool,
  large: PropTypes.bool,
};

export default Modal;
