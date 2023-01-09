import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
// import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuth } from './selectors';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { currentUser } = useSelector(selectAuth);

  return currentUser ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
