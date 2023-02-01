import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Status from 'components/Status';
import { divideSpaceIdCard, parseMoneyVnd } from 'utils/helpers';

import './style.scss';
import { useDispatch } from 'react-redux';
import { approveDebt, rejectDebt } from 'global/redux/debt/thunk';

const statusIcons = {
  failed: <Status failed />,
  pending: <Status pending />,
  success: <Status success />,
  refund: <Status refund />,
  paid: <Status paid />,
  unpaid: <Status unpaid />,
  canceled: <Status canceled />,
};

const DetailModal = ({ detailData, setToggle }) => {
  const dispatch = useDispatch();

  const { from, dest, totalAmount, desc, reason, status, id } = detailData;

  const handleReject = async () => {
    const {
      payload: { status: rejectReqStatus },
    } = await dispatch(rejectDebt({ id }));
    if (rejectReqStatus) {
      setToggle();
    }
  };

  const handleApprove = async () => {
    const {
      payload: { status: approveStatus },
    } = await dispatch(approveDebt({ id }));
    if (approveStatus) {
      setToggle();
    }
  };

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
        {status === 'pending' && (
          <div className='btn-group'>
            <DefaultButton onClick={handleReject}>Reject</DefaultButton>
            <DefaultButton danger onClick={handleApprove}>
              Approve
            </DefaultButton>
          </div>
        )}
        <DefaultButton onClick={setToggle} danger>
          {status === 'pending' ? 'Cancel' : 'OK'}
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default DetailModal;
