import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuth } from './selectors';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useSelector(selectAuth);

  useEffect(() => {
    if (!currentUser) {
      switch (location.pathname) {
      case '/forgot':
        navigate('/forgot');
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
