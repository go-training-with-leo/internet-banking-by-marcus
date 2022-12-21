import React, { useEffect, useRef } from 'react';

import authentication from 'global/redux/requests/auth';

import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import options from 'utils/constants/toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const captchaRef = useRef(null);

	const navigate = useNavigate();

	const { currentUser } = useSelector((state) => state.auth);

	console.warn(currentUser);
	const handleSubmit = (e) => {
		e.preventDefault();
		const captchaToken = captchaRef.current.getValue();
		if (captchaToken.length) {
			const {
				email: { value: email },
				password: { value: password },
			} = e.target;
			authentication.signIn(email, password);
			toast.success('LogIn !', options.default);
		} else toast.error('Check captcha !', options.default);
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

export default Login;
