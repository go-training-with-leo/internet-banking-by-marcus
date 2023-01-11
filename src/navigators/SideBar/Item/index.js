import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import './style.scss';

const SideBarItem = ({ isActive, isStatic, children, onClick }) => {
  return (
    <div
      className={classNames('sidebar-item', {
        active: isActive,
        static: isStatic,
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
  isStatic: false,
  children: undefined,
  onClick: undefined,
};

SideBarItem.propTypes = {
  isActive: PropTypes.bool,
  isStatic: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func,
};

export default memo(SideBarItem);
