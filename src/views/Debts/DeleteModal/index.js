import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import TextArea from 'components/TextArea';
import { deleteDebt } from 'global/redux/debt/thunk';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectDebt } from 'core/selectors';

const DeleteModal = ({ debtData, setToggle }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectDebt);
  const { register, handleSubmit } = useForm();

  const onDelete = async (formData) => {
    const { reason } = formData;
    const {
      payload: { status },
    } = await dispatch(deleteDebt({ id: debtData.id, reason }));
    if (status) {
      setToggle();
    }
  };

  return (
    <Modal setToggle={setToggle} title='Alert!' cancel clickOutSide>
      <form className='delete-modal' onSubmit={handleSubmit(onDelete)}>
        <p>
          You are about to remove a debt! This action cannot be restore.
          <br />
          Appropriate notification will be sent to relevant accounts.
        </p>
        <div className='delete-textarea'>
          <TextArea register={register} name='reason' label='Reason:' />
        </div>
        <div className='delete-btn-group'>
          <div className='btn'>
            <DefaultButton loading={loading} type='submit' danger>
              Delete
            </DefaultButton>
          </div>
          <div className='btn'>
            <DefaultButton disabled={loading} onClick={setToggle}>
              Cancel
            </DefaultButton>
          </div>
        </div>
      </form>
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
