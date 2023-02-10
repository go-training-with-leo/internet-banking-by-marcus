import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Radio = ({ name, label, value, onChange, checked }) => {
  return (
    <span className='radio-container'>
      <div className='radio'>
        <input
          value={value}
          className='radio-input'
          type='radio'
          name={name}
          onChange={(e) => onChange(e)}
        />
        <span className={classNames('pseudo-input', { dot: checked })} />
      </div>
      <span className={classNames('label', { hide: !label })}>{label}</span>
    </span>
  );
};

Radio.defaultProps = {
  label: '',
  value: '',
  name: '',
  checked: false,
  onChange: () => {},
};

Radio.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Radio;
