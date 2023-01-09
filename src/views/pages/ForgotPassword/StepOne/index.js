import React from 'react';
import { useTranslation } from 'react-i18next';

import DefaultButton from 'components/Button/Default';
import Input from 'components/Input';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { sendCode } from 'global/redux/auth/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter } from 'utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import validEmail from './validation';

const StepOne = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.ForgotPassword',
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validEmail) });

  const { isLoading: loading } = useSelector((state) => state.auth);

  const onSubmit = async (formData) => {
    const {
      payload: { status, message },
    } = await dispatch(
      sendCode({
        ...formData,
      })
    );

    if (status) {
      if (message !== 'Success') {
        setError('email', {
          type: 'custom',
          message,
        });
      }
    } else {
      setError('email', {
        type: 'custom',
        message,
      });
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <p className='description'>{t('enterEmailWithAccount')}</p>
      <Input
        type='email'
        disabled={loading}
        label={
          errors.email
            ? capitalizeFirstLetter(errors.email?.message)
            : t('yourAccount')
        }
        placeholder={t('enterEmail')}
        register={register}
        error={errors.email && true}
        name='email'
        key='email'
      />
      <span className='forgot'>
        <Link to='/login'>{t('rememberMyPassword')}</Link>
      </span>
      <div className='submit'>
        <DefaultButton loading={loading} type='submit' danger>
          {t('resetPassword')}
        </DefaultButton>
      </div>
    </form>
  );
};

export default StepOne;
