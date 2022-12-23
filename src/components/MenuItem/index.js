import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'components/MenuItem/style.scss';

const MenuItem = ({ icon, isActive, children }) => {
  return (
    <div
      className={classNames('menu-item', {
        active: isActive,
      })}
    >
      {icon}
      {children}
    </div>
  );
};

MenuItem.defaultProps = {
  isActive: false,
  icon: undefined,
  children: undefined,
};

MenuItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.string,
};

export default MenuItem;
