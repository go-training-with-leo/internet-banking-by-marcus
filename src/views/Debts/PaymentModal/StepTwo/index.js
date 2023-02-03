import { yupResolver } from '@hookform/resolvers/yup';
import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import { selectAuth, selectDebt } from 'core/selectors';
import { paymentDebt, verifyCode } from 'global/redux/debt/thunk';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import validOTP from './validation';

import './style.scss';

const StepTwo = ({ setToggle, back, debtDetail }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(selectAuth);
  const { isLoading: loading } = useSelector(selectDebt);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(validOTP) });
  const onVerify = async (formData) => {
    const {
      payload: { status: verifyStatus, message },
    } = await dispatch(
      verifyCode({ email: currentUser?.email, otp: formData.otp })
    );

    if (verifyStatus) {
      if (message !== 'Correct') {
        setError('otp', {
          type: 'custom',
          message,
        });
      } else {
        const {
          payload: { status: paymentStatus },
        } = await dispatch(paymentDebt({ debtDetail }));

        if (paymentStatus) {
          setToggle();
        }
      }
    } else {
      setError('otp', {
        type: 'custom',
        message: 'Verify failed',
      });
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
        label={errors?.otp ? errors?.otp?.message : 'OTP:'}
        error={errors?.otp && true}
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
