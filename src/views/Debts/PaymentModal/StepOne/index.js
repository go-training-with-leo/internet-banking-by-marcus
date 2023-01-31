import DefaultButton from 'components/Button/Default';
import { selectAuth, selectDebt } from 'core/selectors';
import { sendCode } from 'global/redux/debt/thunk';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { divideSpaceIdCard, parseMoneyVnd } from 'utils/helpers';

const StepOne = ({ setToggle, debtDetail, next }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectDebt);
  const { currentUser } = useSelector(selectAuth);
  const { from, dest, totalAmount, desc } = debtDetail;

  const handleSendCode = async () => {
    const {
      payload: { status },
    } = await dispatch(sendCode({ email: currentUser?.email }));

    if (status) {
      next();
    }
  };

  return (
    <div className='payment-modal'>
      <span>Are you sure you want to pay this debt?</span>
      <div className='detail-row'>
        <span className='title'>Lender:</span>
        <p>
          {from?.accountName}/{divideSpaceIdCard(from?.cardNumber)}/{from?.bank}
        </p>
      </div>
      <div className='detail-row'>
        <span className='title'>Debtor:</span>
        <p>
          {dest?.contactName}/{divideSpaceIdCard(dest?.cardNumber)}/{dest?.bank}
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

      <div className='payment-btn-group'>
        <DefaultButton disabled={loading} onClick={setToggle}>
          Cancel
        </DefaultButton>
        <DefaultButton loading={loading} onClick={handleSendCode} danger>
          Pay
        </DefaultButton>
      </div>
    </div>
  );
};

export default StepOne;
