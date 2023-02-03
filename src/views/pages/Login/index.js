import React, { memo, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import AuthLayout from 'layouts/Auth';
import Button from 'components/Button/Default';
import Input from 'components/Input';
import Wrapper from 'components/Wrapper';

import Env from 'config/Env';
import { selectAuth } from 'core/selectors';
import { useTranslation } from 'react-i18next';
import { logIn } from 'global/redux/auth/thunk';
import {
  capitalizeFirstLetter,
  getLocalStorage,
  getMainPageByRole,
} from 'utils/helpers';
import { signInValidate } from './validation';

import './style.scss';

const Login = () => {
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = getLocalStorage('role');

  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Login' });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInValidate) });

  const { currentUser, isLoading } = useSelector(selectAuth);

  const onSubmit = (account) => {
    const captchaToken = captchaRef.current.getValue();
    if (captchaToken.length) {
      const { email, password } = account;
      dispatch(logIn({ email, password }));
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate(getMainPageByRole(role));
    }
  }, [currentUser, navigate, role]);

  return (
    <AuthLayout>
      <Wrapper title={t('loginTitle')}>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                type='email'
                name='email'
                value={value}
                label={
                  errors.email?.message
                    ? capitalizeFirstLetter(errors.email?.message)
                    : t('accountLabel')
                }
                onChange={(val) => onChange(val)}
                withIcon
                error={errors.email && true}
                placeholder={t('accountPlaceHolder')}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                type='password'
                name='password'
                label={
                  errors.password?.message
                    ? capitalizeFirstLetter(errors.password?.message)
                    : t('passwordLabel')
                }
                withIcon
                onChange={(val) => onChange(val)}
                error={errors.password && true}
                placeholder={t('passwordPlaceHolder')}
              />
            )}
          />
          <span className='forgot'>
            <Link to='/forgot'>{t('forgotPassword')}</Link>
          </span>
          <ReCAPTCHA ref={captchaRef} sitekey={Env.CAPTCHA_SITE_KEY} />
          <Button loading={isLoading} danger type='submit'>
            {t('login')}
          </Button>
        </form>
      </Wrapper>
    </AuthLayout>
  );
};

export default memo(Login);
