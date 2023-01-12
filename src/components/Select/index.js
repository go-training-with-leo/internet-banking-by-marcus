import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Select, { components } from 'react-select';

import colourStyles from './selectStyle';

import './style.scss';

const { Option } = components;

const IconOption = (props) => {
  const { data } = props;
  return (
    <Option className='option' {...props}>
      {data?.icon && <data.icon />}
      {data?.label}
    </Option>
  );
};

const Selection = ({ options, placeholder, value, onChange }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div
      className='select'
      role='menu'
      tabIndex={0}
      onClick={() => setIsOpenMenu(!isOpenMenu)}
    >
      <div className='select-input-container'>
        <span className='label'>Label</span>
        <Select
          classNamePrefix='react-select-input'
          options={options}
          placeholder={placeholder}
          value={options.find((c) => c.value === value)}
          onChange={(val) => onChange(val.value)}
          components={{
            Option: IconOption,
            IndicatorSeparator: () => null,
          }}
          menuIsOpen={isOpenMenu}
          styles={colourStyles}
        />
      </div>
    </div>
  );
};

Selection.defaultProps = {
  options: null,
  placeholder: null,
  value: null,
  onChange: null,
};

Selection.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default Selection;
