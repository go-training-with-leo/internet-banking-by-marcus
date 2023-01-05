import React, { memo, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { signIn } from 'global/redux/auth/thunk';
import Wrapper from 'components/Wrapper';

import Input from 'components/Input';
import Button from 'components/Button/Default';
import { capitalFirstLetter } from 'utils/helpers';
import { signInValidate } from './validation';

import './style.scss';

const Login = () => {
  const captchaRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

      dispatch(signIn({ email, password }));
    }
  };

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  return (
    <Wrapper title='Sign in'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          type='email'
          name='email'
          label={
            errors.email?.message
              ? capitalFirstLetter(errors.email?.message)
              : 'Your account'
          }
          withIcon
          error={errors.email && true}
          placeholder='Enter your email'
        />
        <Input
          register={register}
          type='password'
          name='password'
          label={
            errors.password?.message
              ? capitalFirstLetter(errors.password?.message)
              : 'Your password'
          }
          withIcon
          error={errors.password && true}
          placeholder='Enter your password'
        />
        <span className='forgot'>
          <Link to='/accounts/password/new'>Forgot password?</Link>
        </span>
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        />
        <Button loading={isLoading} danger type='submit'>
          Log in
        </Button>
      </form>
    </Wrapper>
  );
};

export default memo(Login);
