import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import { selectAuth, selectDebt } from 'core/selectors';
import { paymentDebt, verifyCode } from 'global/redux/debt/thunk';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

const StepTwo = ({ setToggle, back, debtDetail }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(selectAuth);
  const { isLoading: loading } = useSelector(selectDebt);
  const { register, handleSubmit } = useForm();

  const onVerify = async (formData) => {
    const {
      payload: { status: verifyStatus },
    } = await dispatch(
      verifyCode({ email: currentUser?.email, otp: formData.otp })
    );

    if (verifyStatus) {
      const {
        payload: { status: paymentStatus },
      } = await dispatch(paymentDebt({ debtDetail }));

      if (paymentStatus) {
        setToggle();
      }
    }
  };

  return (
    <form className='payment-modal' onSubmit={handleSubmit(onVerify)}>
      <p>
        You are about to remove a debt! This action cannot be restore.
        <br />
        Appropriate notification will be sent to relevant accounts.
      </p>
      <Input
        register={register}
        name='otp'
        label='OTP:'
        placeholder='Enter the OTP code'
      />
      <div className='payment-btn-group'>
        <DefaultButton disabled={loading} onClick={back}>
          Back
        </DefaultButton>
        <DefaultButton loading={loading} type='submit' danger>
          Verify
        </DefaultButton>
      </div>
    </form>
  );
};

export default StepTwo;
