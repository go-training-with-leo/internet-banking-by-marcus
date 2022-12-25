import React, { memo, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authentication from 'global/redux/auth/request';
import { signIn } from 'global/redux/auth/thunk';

const TestLogin = () => {
  const captchaRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const captchaToken = captchaRef.current.getValue();
    if (captchaToken.length) {
      const {
        email: { value: email },
        password: { value: password },
      } = e.target;

      dispatch(signIn({ email, password }));

      toast.success('LogIn !');
    } else toast.error('Check captcha !');
  };

  const handleForgotPassword = () => {
    authentication.forgotPassword('marcus.nguyen.goldenowl@gmail.com');
  };

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  return (
    <div className='page'>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' name='email' />
        <input type='password' name='password' />
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        />
        <button type='submit'>Login</button>
      </form>
      <button onClick={handleForgotPassword}>Reset Email</button>
    </div>
  );
};

export default memo(TestLogin);
