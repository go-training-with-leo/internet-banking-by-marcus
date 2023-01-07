import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'components/Button/Default';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Wrapper from 'components/Wrapper';

import { capitalizeFirstLetter } from 'utils/helpers';
import {
  resetPasswordAccount,
  sendCode,
  verifyCode,
} from 'global/redux/auth/thunk';
import { validEmail, validOTP, validPassword } from './validation';

import './style.scss';

const STEP_ONE = 1;
const STEP_TWO = 2;
const STEP_THREE = 3;
const STEP_FOUR = 4;

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const { isLoading: loading } = useSelector((state) => state.auth);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    getValues: getValuesEmail,
    setError: setErrorEmail,
    formState: { errors: errorsEmail },
  } = useForm({ resolver: yupResolver(validEmail) });

  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    setError: setErrorOTP,
    formState: { errors: errorsOTP },
  } = useForm({ resolver: yupResolver(validOTP) });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({ resolver: yupResolver(validPassword) });

  const onSubmit = async (formData) => {
    switch (step) {
    case 1: {
      const {
        payload: { status, message },
      } = await dispatch(
        sendCode({
          ...formData,
        })
      );

      if (status) {
        setStep((prev) => prev + 1);
      } else {
        setErrorEmail('email', {
          type: 'custom',
          message,
        });
      }
      break;
    }
    case 2: {
      const { email } = getValuesEmail();
      const {
        payload: { status, message },
      } = await dispatch(
        verifyCode({
          ...formData,
          email,
        })
      );

      if (status) {
        setStep((prev) => prev + 1);
      } else {
        setErrorOTP('otp', {
          type: 'custom',
          message,
        });
      }
      break;
    }
    case 3: {
      const formEmail = getValuesEmail();

      const {
        payload: { status },
      } = dispatch(
        resetPasswordAccount({
          ...formData,
          email: formEmail.email,
        })
      );
      if (status) {
        setStep((prev) => prev + 1);
      }
      break;
    }
    default:
      break;
    }
  };

  const buttonTitle =
    step === STEP_TWO
      ? 'Verify'
      : step === STEP_THREE
        ? 'Confirm password changes'
        : 'Reset password';

  const titleForm =
    step === STEP_THREE ? 'Create new password' : 'Forgot password';

  const handleSuccess = () => {
    navigate('/login');
  };

  return (
    <Wrapper title={titleForm}>
      {step === STEP_ONE ? (
        <form className='form' onSubmit={handleSubmitEmail(onSubmit)}>
          <p className='description'>
            Enter the email address associated with your account
          </p>
          <Input
            type='email'
            disabled={loading}
            label={
              errorsEmail.email
                ? capitalizeFirstLetter(errorsEmail.email?.message)
                : 'Your account'
            }
            placeholder='Enter your email address'
            register={registerEmail}
            error={errorsEmail.email && true}
            name='email'
            key='email'
          />
          <span className='forgot'>
            <Link to='/login'>I remembered my password?</Link>
          </span>
          <div className='submit'>
            <Button loading={loading} type='submit' danger>
              {buttonTitle}
            </Button>
          </div>
        </form>
      ) : step === STEP_TWO ? (
        <form className='form' onSubmit={handleSubmitOTP(onSubmit)}>
          <p className='description'>
            A OTP code has been sent to your email <br />
            Please check your inbox and follow the instructions
          </p>
          <Input
            type='text'
            label={
              errorsOTP.otp?.message
                ? capitalizeFirstLetter(errorsOTP.otp?.message)
                : 'OTP:'
            }
            placeholder='Enter the OTP code'
            register={registerOTP}
            name='otp'
            disabled={loading}
            key='otp'
            error={errorsOTP.otp && true}
          />
          <span className='forgot'>
            <Link to='/login'>I remembered my password?</Link>
          </span>
          <div className='submit'>
            <Button loading={loading} type='submit' danger>
              {buttonTitle}
            </Button>
          </div>
        </form>
      ) : (
        <>
          <form className='form' onSubmit={handleSubmitPassword(onSubmit)}>
            <p className='description'>
              Enter the new password for your account
            </p>
            <Input
              type='password'
              label={
                errorsPassword.newPassword
                  ? capitalizeFirstLetter(errorsPassword.newPassword?.message)
                  : 'New password:'
              }
              placeholder='Enter new password'
              register={registerPassword}
              disabled={loading}
              name='newPassword'
              key='newPassword'
              error={errorsPassword.newPassword && true}
            />
            <Input
              type='password'
              label={
                errorsPassword.renewPassword
                  ? capitalizeFirstLetter(errorsPassword.renewPassword?.message)
                  : 'Confirm password'
              }
              placeholder='Re-enter new password'
              register={registerPassword}
              disabled={loading}
              name='renewPassword'
              key='renewPassword'
              error={errorsPassword.renewPassword?.message && true}
            />
            <div className='submit'>
              <Button loading={loading} type='submit' danger>
                {buttonTitle}
              </Button>
            </div>
          </form>
          {step === STEP_FOUR && (
            <Modal title='SUCCESS!'>
              <div className='modal-content'>
                <p>
                  You have successfully resetted your password. <br />
                  You can use your new sign-in infomation to log in
                </p>
                <Button danger onClick={handleSuccess}>
                  OK
                </Button>
              </div>
            </Modal>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default ForgotPassword;
