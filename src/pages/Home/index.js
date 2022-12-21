import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { setUser } from 'global/redux/reducers/auth';
import options from 'utils/constants/toast';

import 'react-toastify/dist/ReactToastify.css';
import authentication from 'global/redux/requests/auth';

const Home = () => {
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	console.warn(user);

	const handleClick = async () => {
		dispatch(
			setUser({
				content: 'test dispatch',
			})
		);
		await authentication.signIn(
			'marcus.nguyen.goldenowl@gmail.com',
			'password123'
		);
		toast.success('Test success toast !', options.default);
	};

	return (
		<div className='page'>
			<button onClick={handleClick}>Dispatch</button>
		</div>
	);
};

export default Home;
