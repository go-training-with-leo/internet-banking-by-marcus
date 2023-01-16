import PropTypes from 'prop-types';
import React from 'react';

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
  register: () => {},
  label: undefined,
};

TextArea.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default TextArea;
