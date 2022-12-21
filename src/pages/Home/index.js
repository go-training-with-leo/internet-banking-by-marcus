import React from 'react';
import { toast } from 'react-toastify';

import options from 'utils/constants/toast';

import authentication from 'global/redux/requests/auth';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const Home = () => {
	const { currentUser } = useSelector((state) => state.auth);

	console.warn(currentUser);

	const handleClick = async () => {
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
