import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Stepper from 'components/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransfer } from 'core/selectors';
import { divideSpaceIdCard, parseMoneyVnd } from 'utils/helpers';
import { useForm } from 'react-hook-form';
import { transfer } from 'global/redux/transfer/thunk';

import './style.scss';

const StepFive = ({ setToggle, back, next }) => {
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();
  const { transferInfo } = useSelector(selectTransfer);
  const {
    transferInfo: { from, dest, totalAmount, chargedBy },
    isLoading: loading,
  } = useSelector(selectTransfer);

  const onCharged = async () => {
    const {
      payload: { status },
    } = await dispatch(transfer({ transferInfo }));
    if (status) {
      next();
    }
  };

  return (
    <Modal cancel clickOutSide setToggle={setToggle} large>
      <form className='step-five' onSubmit={handleSubmit(onCharged)}>
        <Stepper title='Finish' step='5'>
          Check your payment details again and finish the process
        </Stepper>
        <p>
          Your detailed payment information is below
          <br />
          Please check carefully before finishing the payment process
        </p>
        <div className='step-five-tab-info'>
          <div className='step-five-tab-info__line'>
            <span className='title'>From:</span>
            <span>
              {divideSpaceIdCard(from?.cardNumber)} / {from?.accountName} /{' '}
              {from?.bank}
            </span>
          </div>
          <div className='step-five-tab-info__line'>
            <span className='title'>To:</span>
            <span>
              {divideSpaceIdCard(dest?.cardNumber)} / {dest?.contactName} /{' '}
              {dest?.bank}
            </span>
          </div>
          <div className='step-five-tab-info__line'>
            <span className='title'>Amount:</span>
            <span>{parseMoneyVnd(totalAmount)} VND</span>
          </div>
          <div className='step-five-tab-info__line'>
            <span className='title'>Payment fee:</span>
            <span>Paid by {chargedBy}</span>
          </div>
        </div>
        <div className='btn-group'>
          <div className='step-five-btn'>
            <DefaultButton disabled={loading} onClick={back}>
              Back
            </DefaultButton>
          </div>
          <div className='step-five-btn'>
            <DefaultButton loading={loading} type='submit' danger>
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepFive.defaultProps = {
  setToggle: () => {},
  back: () => {},
  next: () => {},
};

StepFive.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default StepFive;
