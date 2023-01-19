import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import { deleteContact } from 'global/redux/contact/thunk';
import { selectContact } from 'core/selectors';

import './style.scss';

const DeleteModal = ({ setToggle, contactData }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectContact);

  const handleConfirm = async () => {
    const {
      payload: { status },
    } = await dispatch(deleteContact({ id: contactData.id }));

    if (status) {
      setToggle();
    }
  };

  return (
    <Modal setToggle={setToggle} title='Alert!' clickOutSide cancel>
      <div className='delete-modal'>
        <span className='confirm-text'>
          You are about to remove a contact! This action cannot be restore.
        </span>
        <div className='btns-group'>
          <div className='btn'>
            <DefaultButton loading={loading} onClick={handleConfirm} danger>
              Confirm
            </DefaultButton>
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
