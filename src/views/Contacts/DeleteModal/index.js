import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';

import './style.scss';

const DeleteModal = ({ setToggle }) => {
  return (
    <Modal setToggle={setToggle} title='Alert!' clickOutSide cancel>
      <div className='delete-modal'>
        <span className='confirm-text'>
          You are about to remove a contact! This action cannot be restore.
        </span>
        <div className='btns-group'>
          <div className='btn'>
            <DefaultButton danger>Confirm</DefaultButton>
          </div>
          <div className='btn'>
            <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
