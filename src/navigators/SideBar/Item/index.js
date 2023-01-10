import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const SideBarItem = ({ isActive, children, onClick }) => {
  return (
    <div
      className={classNames('sidebar-item', {
        active: isActive,
      })}
      role='listitem'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

SideBarItem.defaultProps = {
  isActive: false,
  children: undefined,
  onClick: undefined,
};

SideBarItem.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default SideBarItem;
