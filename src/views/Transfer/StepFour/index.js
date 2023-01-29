import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Stepper from 'components/Stepper';

import './style.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCode } from 'global/redux/transfer/thunk';
import { selectAuth, selectTransfer } from 'core/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import validOTP from 'views/pages/ForgotPassword/StepTwo/validation';
import { capitalizeFirstLetter } from 'utils/helpers';

const StepFour = ({ setToggle, back, next }) => {
  const dispatch = useDispatch();

  const { isLoading: loading } = useSelector(selectTransfer);
  const { currentUser } = useSelector(selectAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validOTP) });

  const onVerify = async (formData) => {
    const { otp } = formData;
    const {
      payload: { status, message },
    } = await dispatch(verifyCode({ email: currentUser?.email, otp }));

    if (status) {
      if (message === 'Correct') {
        next();
      } else {
        setError('otp', {
          type: 'custom',
          message,
        });
      }
    } else {
      setError('otp', {
        type: 'custom',
        message,
      });
    }
  };

  return (
    <Modal cancel clickOutSide setToggle={setToggle}>
      <form className='step-four' onSubmit={handleSubmit(onVerify)}>
        <Stepper title='Verify ' step='4'>
          Verify your payment using OTP code
        </Stepper>
        <p>
          An OTP code has been sent to your email
          <br />
          Please check your inbox and follow the instructions
        </p>
        <Input
          register={register}
          name='otp'
          text='text'
          disabled={loading}
          label={
            errors.otp?.message
              ? capitalizeFirstLetter(errors.otp?.message)
              : 'OTP:'
          }
          placeholder='Enter the OTP code'
          error={errors?.otp}
        />
        <div className='btn-group'>
          <div className='step-four-btn'>
            <DefaultButton disabled={loading} onClick={back}>
              Back
            </DefaultButton>
          </div>
          <div className='step-four-btn'>
            <DefaultButton loading={loading} type='submit' danger>
              Next
            </DefaultButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};

StepFour.defaultProps = {
  setToggle: () => {},
  back: () => {},
  next: () => {},
};

StepFour.propTypes = {
  setToggle: PropTypes.func,
  back: PropTypes.func,
  next: PropTypes.func,
};

export default StepFour;
