import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const SmallCard = ({ isActive, label, children, handleClick }) => {
  return (
    <div
      className={classNames('small-card', { active: isActive })}
      role='listitem'
      onClick={handleClick}
    >
      {children}
      <span className='label'>{label}</span>
    </div>
  );
};

SmallCard.defaultProps = {
  isActive: false,
  handleClick: undefined,
};

SmallCard.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
};

export default SmallCard;
