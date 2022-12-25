import React, { isValidElement, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'components/MenuItem/style.scss';

const MenuItem = ({ icon, isActive, children, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={classNames('menu-item', {
        active: isActive,
      })}
      onMouseMove={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      role='listitem'
      onClick={onClick}
    >
      {isActive && isValidElement(icon)
        ? cloneElement(icon, { fill: '#EF230C' })
        : isHover
          ? cloneElement(icon, { fill: '#FFF' })
          : icon}
      {children}
    </div>
  );
};

MenuItem.defaultProps = {
  isActive: false,
  children: undefined,
  icon: null,
  onClick: undefined,
};

MenuItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default MenuItem;
