import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/helpers';
import { useSelector } from 'react-redux';
import { selectAuth } from './selectors';

const homePages = {
  ADMIN: '/employees',
  EMPLOYEE: '/cards',
  CUSTOMER: '/customer/accounts',
};

const RoleRoute = ({ roles, children }) => {
  const { currentUser } = useSelector(selectAuth);
  const role = getLocalStorage('role');
  return roles.some((roleItem) => roleItem === role) ? (
    children
  ) : currentUser ? (
    <Navigate to={homePages[role]} />
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
