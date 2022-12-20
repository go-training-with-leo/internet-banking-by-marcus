import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
	console.warn('Private route');
	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PrivateRoute;
