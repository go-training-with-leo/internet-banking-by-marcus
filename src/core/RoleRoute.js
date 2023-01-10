import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getLocalStorage, getMainPage } from 'utils/helpers';
import { useSelector } from 'react-redux';
import { selectAuth } from './selectors';

const RoleRoute = ({ roles, children }) => {
  const { currentUser } = useSelector(selectAuth);
  const role = getLocalStorage('role');
  return roles.some((roleItem) => roleItem === role) ? (
    children
  ) : currentUser ? (
    <Navigate to={getMainPage(role)} />
  ) : (
    <Navigate to='/login' />
  );
};

RoleRoute.defaultProps = {
  roles: [],
  children: undefined,
};

RoleRoute.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default RoleRoute;
