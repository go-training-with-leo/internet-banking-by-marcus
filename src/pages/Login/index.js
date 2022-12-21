import authentication from 'global/redux/requests/auth';
import React from 'react';

const Login = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const {
			email: { value: email },
			password: { value: password },
		} = e.target;

		authentication.signIn(email, password);
	};

	const handleForgotPassword = () => {
		authentication.forgotPassword('marcus.nguyen.goldenowl@gmail.com');
	};

	return (
		<div className='page'>
			<form className='form' onSubmit={handleSubmit}>
				<input type='text' name='email' />
				<input type='password' name='password' />
				<button type='submit'>Login</button>
			</form>
			<button onClick={handleForgotPassword}>Reset Email</button>
		</div>
	);
};

export default Login;
