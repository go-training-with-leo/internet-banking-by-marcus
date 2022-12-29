import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const TextArea = ({ register, name, label }) => {
  return (
    <div className='text-area'>
      <label htmlFor={`text-area-${name}`}>{label}</label>
      <textarea {...register(name)} id={`text-area-${name}`} />
    </div>
  );
};

TextArea.defaultProps = {
  register: null,
  label: undefined,
};

TextArea.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default TextArea;
