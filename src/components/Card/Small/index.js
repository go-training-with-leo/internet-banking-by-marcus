import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { capitalizeFirstLetter, isNumber } from 'utils/helpers';

import './style.scss';

const SmallCard = ({ isActive, label, children, onClick }) => {
  return (
    <div
      className={classNames('small-card', { active: isActive })}
      role='listitem'
      onClick={onClick}
    >
      {isNumber(children) ? children : 'Invalid type'}
      <span className='label'>{capitalizeFirstLetter(label)}</span>
    </div>
  );
};

SmallCard.defaultProps = {
  isActive: false,
  onClick: undefined,
};

SmallCard.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onClick: PropTypes.func,
};

export default SmallCard;
