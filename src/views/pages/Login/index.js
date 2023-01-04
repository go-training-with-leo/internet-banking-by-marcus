import React, { memo, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signIn } from 'global/redux/auth/thunk';
import Wrapper from 'components/Wrapper';
import { EightGif, EightLogo } from 'assets/images';

import './style.scss';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Default';

const Login = () => {
  const captchaRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

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
    <div className='login-page'>
      <div className='login-logo'>
        <img src={EightGif} alt='Gif logo' width={146} />
        <EightLogo width={200} height={45} />
        <span>an internet banking service by Team Eight</span>
      </div>
      <div className='login-form'>
        <Wrapper title='Sign in'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              type='email'
              name='email'
              label='Your account'
              withIcon
              placeholder='Enter your email'
            />
            <Input
              register={register}
              type='password'
              name='password'
              label='Your password'
              withIcon
              placeholder='Enter your password'
            />
            <span className='forgot'>
              <Link to='/account'>Forgot password?</Link>
            </span>
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            />
            <div className='submit'>
              <Button loading={isLoading} danger type='submit'>
                Log in
              </Button>
            </div>
          </form>
        </Wrapper>
      </div>
    </div>
  );
};

export default memo(Login);
