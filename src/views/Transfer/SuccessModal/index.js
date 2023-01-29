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
          {parseMoneyVnd(transferInfo?.totalAmount)} VND to the account{' '}
          {divideSpaceIdCard(transferInfo?.dest?.cardNumber)} /{' '}
          {transferInfo?.dest?.contactName} / EIGHT.Bank at{' '}
          {convertTimestamp(transferInfo.createdAt?.seconds)}
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
