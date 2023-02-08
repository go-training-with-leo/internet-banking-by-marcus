import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransfer } from 'core/selectors';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';
import { resetTransferInfo } from 'global/redux/transfer/slice';

import './style.scss';

const SuccessModal = ({ setToggle }) => {
  const dispatch = useDispatch();

  const { transferInfo } = useSelector(selectTransfer);

  const handleFinish = () => {
    dispatch(resetTransferInfo());
    setToggle();
  };
  return (
    <Modal title='SUCCESS!'>
      <div className='success-modal'>
        <p>
          You have succesfully transfered the amout of{' '}
          <b>{parseMoneyVnd(transferInfo?.totalAmount)}</b> VND to the account{' '}
          <b>{divideSpaceIdCard(transferInfo?.dest?.cardNumber)}</b> /{' '}
          <b>{transferInfo?.dest?.contactName}</b> / <b>EIGHT.Bank at</b>{' '}
          <b>{convertTimestamp(transferInfo.createdAt?.seconds)}</b>
        </p>
        <DefaultButton danger onClick={handleFinish}>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

SuccessModal.defaultProps = {
  setToggle: () => {},
};

SuccessModal.propTypes = {
  setToggle: PropTypes.func,
};

export default SuccessModal;
