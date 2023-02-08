import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Status from 'components/Status';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';
import { approveDebt, rejectDebt } from 'global/redux/debt/thunk';
import { selectDebt } from 'core/selectors';

import './style.scss';

const CREATE_BY_YOU = 'CREATE_BY_YOU';

const statusIcons = {
  failed: <Status failed />,
  pending: <Status pending />,
  success: <Status success />,
  refund: <Status refund />,
  paid: <Status paid />,
  unpaid: <Status unpaid />,
  canceled: <Status canceled />,
};

const DetailModal = ({ detailData, setToggle, currentTab }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectDebt);
  const { from, dest, totalAmount, desc, reason, status, id, createdAt } =
    detailData;

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
    } = await dispatch(approveDebt({ detailData }));
    if (approveStatus) {
      setToggle();
    }
  };

  return (
    <Modal setToggle={setToggle} title='Debt details' cancel clickOutSide large>
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
        <div className='detail-row'>
          <span className='title'>Created at:</span>
          <span>
            {convertTimestamp(
              createdAt?.seconds
                ? createdAt.seconds * 1000
                : new Date(createdAt)
            )}
          </span>
        </div>
        <div className='detail-col'>
          {reason && (
            <>
              <span>Reason of removal:</span>
              <p>{reason}</p>
            </>
          )}
        </div>
        {status === 'pending' && currentTab === CREATE_BY_YOU && (
          <div className='btn-group'>
            <DefaultButton disabled={loading} onClick={handleReject}>
              Reject
            </DefaultButton>
            <DefaultButton loading={loading} danger onClick={handleApprove}>
              Approve
            </DefaultButton>
          </div>
        )}
        <DefaultButton disabled={loading} onClick={setToggle} danger>
          {status === 'pending' ? 'Cancel' : 'OK'}
        </DefaultButton>
      </div>
    </Modal>
  );
};

export default DetailModal;
