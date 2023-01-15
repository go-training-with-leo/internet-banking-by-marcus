import PropTypes from 'prop-types';
import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import TextArea from 'components/TextArea';

import './style.scss';

const DeleteModal = ({ setToggle }) => {
  return (
    <Modal setToggle={setToggle} title='Alert!' cancel clickOutSide>
      <div className='delete-modal'>
        <p>
          You are about to remove a debt! This action cannot be restore.
          <br />
          Appropriate notification will be sent to relevant accounts.
        </p>
        <div className='delete-textarea'>
          <TextArea name='reason' label='Reason:' />
        </div>
        <div className='delete-btn-group'>
          <div className='btn'>
            <DefaultButton danger>Delete</DefaultButton>
          </div>
          <div className='btn'>
            <DefaultButton onClick={setToggle}>Cancel</DefaultButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

DeleteModal.defaultProps = {
  setToggle: () => {},
};

DeleteModal.propTypes = {
  setToggle: PropTypes.func,
};

export default DeleteModal;
