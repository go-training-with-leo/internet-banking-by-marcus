import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      switch (location.pathname) {
      case '/accounts/password/new':
        navigate('/accounts/password/new');
        break;
      default:
        navigate('/login');
        break;
      }
    }
  }, [currentUser, navigate]);

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
