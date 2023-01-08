import React, { memo, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'components/Button/Default';
import Input from 'components/Input';
import Wrapper from 'components/Wrapper';

import { logIn } from 'global/redux/auth/thunk';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'utils/helpers';
import { signInValidate } from './validation';

import './style.scss';

const Login = () => {
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Login' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInValidate) });
  const { currentUser, isLoading } = useSelector((state) => state.auth);

  const onSubmit = (account) => {
    const captchaToken = captchaRef.current.getValue();
    if (captchaToken.length) {
      const { email, password } = account;
      dispatch(logIn({ email, password }));
    }
  };

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  return (
    <Wrapper title={t('loginTitle')}>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          type='email'
          name='email'
          label={
            errors.email?.message
              ? capitalizeFirstLetter(errors.email?.message)
              : t('accountLabel')
          }
          withIcon
          error={errors.email && true}
          placeholder={t('accountPlaceHolder')}
        />
        <Input
          register={register}
          type='password'
          name='password'
          label={
            errors.password?.message
              ? capitalizeFirstLetter(errors.password?.message)
              : t('passwordLabel')
          }
          withIcon
          error={errors.password && true}
          placeholder={t('passwordPlaceHolder')}
        />
        <span className='forgot'>
          <Link to='/forgot'>{t('forgotPassword')}</Link>
        </span>
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        />
        <Button loading={isLoading} danger type='submit'>
          {t('login')}
        </Button>
      </form>
    </Wrapper>
  );
};

export default memo(Login);
