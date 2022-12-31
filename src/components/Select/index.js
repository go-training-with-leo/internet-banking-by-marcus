import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

// import { ArrowDown } from 'assets/images';

import './style.scss';

const { Option } = components;

const IconOption = (props) => {
  const { data } = props;
  return (
    <Option className='option' {...props}>
      <data.icon />
      {data?.label}
    </Option>
  );
};

const colourStyles = {
  singleValue: (base) => ({
    ...base,
    color: '#fff',
  }),
  option: () => ({
    color: '#fff',
    background: '#111111',
  }),
  control: (base, state) => ({
    ...base,
    background: '#111111',
    boxShadow: state.isFocused ? null : null,
    borderColor: '#111111',
    '&:hover': {
      borderColor: 'none',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    boxShadow: '0 8px 8px -4px red',
    width: 'max-content',
    minWidth: '100%',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
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
