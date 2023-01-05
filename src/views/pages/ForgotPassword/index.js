import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import Wrapper from 'components/Wrapper';
import Button from 'components/Button/Default';
import Input from 'components/Input';
import Modal from 'components/Modal';

import { capitalFirstLetter } from 'utils/helpers';
import api from 'services/api';
import { validEmail, validOTP, validPassword } from './validation';

import './style.scss';

const Forgot = () => {
  const [form, setForm] = useState({ step: 1, title: 'Forgot password ?' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    console.warn(formData);
    switch (form.step) {
    case 1: {
      setIsLoading(true);

      const res = await api.post('/get', {
        email: formData.email,
      });

      console.warn(res);
      setIsLoading(false);
      if (res.data.message === 'Success') {
        setForm({ ...form, step: form.step + 1 });
      } else {
        setErrorEmail('email', {
          type: 'custom',
          message: 'Email not found',
        });
      }

      break;
    }
    case 2: {
      const formEmail = getValuesEmail();
      setIsLoading(true);

      const res = await api.post('/verify', {
        email: formEmail.email,
        otp: formData.otp,
      });
      setIsLoading(false);
      if (res.data.message === 'You have been successfully registered') {
        setForm({ title: 'Create new password', step: form.step + 1 });
      } else {
        setErrorOTP('otp', { type: 'custom', message: 'OTP Incorrect' });
      }
      break;
    }
    case 3: {
      const formEmail = getValuesEmail();
      setIsLoading(true);

      await api.post('/reset-password', {
        email: formEmail.email,
        password: formData.new_password,
      });
      setIsLoading(false);
      setForm({ title: 'Create new password', step: form.step + 1 });
      break;
    }
    default:
      break;
    }
  };

  const buttonTitle =
    form.step === 2
      ? 'Verify'
      : form.step === 3
        ? 'Confirm password changes'
        : 'Reset password';

  const handleSuccess = () => {
    navigate('/login');
  };

  return (
    <Wrapper title={form.title}>
      {form.step === 1 ? (
        <form className='form' onSubmit={handleSubmitEmail(onSubmit)}>
          <p className='description'>
            Enter the email address associated with your account
          </p>
          <Input
            type='email'
            disabled={isLoading}
            label={
              errorsEmail.email
                ? capitalFirstLetter(errorsEmail.email?.message)
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
            <Button loading={isLoading} type='submit' danger>
              {buttonTitle}
            </Button>
          </div>
        </form>
      ) : form.step === 2 ? (
        <form className='form' onSubmit={handleSubmitOTP(onSubmit)}>
          <p className='description'>
            A OTP code has been sent to your email <br />
            Please check your inbox and follow the instructions
          </p>
          <Input
            type='text'
            label={
              errorsOTP.otp?.message
                ? capitalFirstLetter(errorsOTP.otp?.message)
                : 'OTP:'
            }
            placeholder='Enter the OTP code'
            register={registerOTP}
            name='otp'
            disabled={isLoading}
            key='otp'
            error={errorsOTP.otp && true}
          />
          <span className='forgot'>
            <Link to='/login'>I remembered my password?</Link>
          </span>
          <div className='submit'>
            <Button loading={isLoading} type='submit' danger>
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
                errorsPassword.new_password
                  ? capitalFirstLetter(errorsPassword.new_password?.message)
                  : 'New password:'
              }
              placeholder='Enter new password'
              register={registerPassword}
              disabled={isLoading}
              name='new_password'
              key='new-password'
              error={errorsPassword.new_password && true}
            />
            <Input
              type='password'
              label={
                errorsPassword.renew_password
                  ? capitalFirstLetter(errorsPassword.renew_password?.message)
                  : 'Confirm password'
              }
              placeholder='Re-enter new password'
              register={registerPassword}
              disabled={isLoading}
              name='renew_password'
              key='renew-password'
              error={errorsPassword.renew_password?.message && true}
            />
            <div className='submit'>
              <Button loading={isLoading} type='submit' danger>
                {buttonTitle}
              </Button>
            </div>
          </form>
          {form.step === 4 && (
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

export default Forgot;
