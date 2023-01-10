import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { capitalizeFirstLetter } from 'utils/helpers';

const Stepper = ({ step, title, children }) => {
  return (
    <div className='stepper'>
      <span className='stepper-number'>{step}</span>
      <div className='stepper-content'>
        <span className='title'>{capitalizeFirstLetter(title)}</span>
        <span className='detail'>{children}</span>
      </div>
    </div>
  );
};

Stepper.defaultProps = {
  children: null,
};

Stepper.propTypes = {
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.string,
};

export default Stepper;
