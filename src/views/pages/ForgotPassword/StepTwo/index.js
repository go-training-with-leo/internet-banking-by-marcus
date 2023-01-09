import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';
import { verifyCode } from 'global/redux/auth/thunk';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'utils/helpers';
import validOTP from './validation';

import './style.scss';

const StepTwo = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ForgotPassword',
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validOTP) });
  const {
    formData: { email },
    isLoading: loading,
  } = useSelector((state) => state.auth);

  const onSubmit = async (formData) => {
    const {
      payload: { status, message },
    } = await dispatch(
      verifyCode({
        ...formData,
        email,
      })
    );

    if (status) {
      if (message !== 'You have been successfully registered') {
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
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <p className='description'>
        {t('notifyOTPWasSent')}
        <br />
        {t('pleaseCheckOTP')}
      </p>
      <Input
        type='text'
        label={
          errors.otp?.message
            ? capitalizeFirstLetter(errors.otp?.message)
            : 'OTP:'
        }
        placeholder={t('fillOTP')}
        register={register}
        name='otp'
        disabled={loading}
        key='otp'
        error={errors.otp}
      />
      <span className='forgot'>
        <Link to='/login'>{t('rememberMyPassword')}</Link>
      </span>
      <div className='submit'>
        <DefaultButton loading={loading} type='submit' danger>
          {t('verify')}
        </DefaultButton>
      </div>
    </form>
  );
};

export default StepTwo;
