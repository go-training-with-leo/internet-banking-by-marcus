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
		authentication.signOut();
		toast.success('Test success toast !', options.default);
	};

	return (
		<div className='page'>
			<button onClick={handleClick}>SignOut</button>
		</div>
	);
};

export default Home;
