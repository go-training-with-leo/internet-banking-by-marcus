import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Status from 'components/Status';
import { divideSpaceIdCard, parseMoneyVnd } from 'utils/helpers';

import './style.scss';

const statusIcons = {
  failed: <Status failed />,
  success: <Status success />,
  refund: <Status refund />,
  paid: <Status paid />,
  unpaid: <Status unpaid />,
  canceled: <Status canceled />,
};

const DetailModal = ({ detailData, setToggle }) => {
  const { from, dest, totalAmount, desc, reason, status } = detailData;
  console.warn(detailData);

  return (
    <Modal setToggle={setToggle} title='Debt details' cancel clickOutSide>
      <div className='detail-modal'>
        <div className='detail-row'>
          <span className='title'>Lender:</span>
          <p>
            {from?.accountName}/{divideSpaceIdCard(from?.cardNumber)}/
            {from?.bank}
          </p>
        </div>
        <div className='detail-row'>
          <span className='title'>Debtor:</span>
          <p>
            {dest?.contactName}/{divideSpaceIdCard(dest?.cardNumber)}/
            {dest?.bank}
          </p>
        </div>
        <div className='detail-row'>
          <span className='title'>Amount:</span>
          <span>{parseMoneyVnd(totalAmount)} VND</span>
        </div>
        <div className='detail-row'>
          <span className='title'>Description:</span>
          <p>{desc || 'No description'}</p>
        </div>
        <div className='detail-row'>
          <span className='title'>Status:</span>
          {statusIcons[status]}
        </div>
        <div className='detail-col'>
          {reason && (
            <>
              <span>Reason of removal:</span>
              <p>{reason}</p>
            </>
          )}
        </div>
        <DefaultButton onClick={setToggle} danger>
          OK
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default DetailModal;
