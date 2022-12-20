import { setUser } from 'global/redux/reducers/auth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	console.warn(user);

	const handleClick = () => {
		dispatch(
			setUser({
				content: 'test dispatch',
			})
		);
	};

	return (
		<div className='page'>
			<button onClick={handleClick}>Dispatch</button>
		</div>
	);
};

export default Home;
