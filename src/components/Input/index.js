import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { AlertYellow, User, Locker, Eye, EyeCross } from 'assets/images';

import 'components/Input/style.scss';

const Input = ({
  register,
  type,
  label,
  name,
  error,
  withIcon,
  placeholder,
  disabled,
  onChange,
}) => {
  const [togglePw, setTogglePw] = useState(false);
  const [inputType, setInputType] = useState(type);

  return (
    <div
      className={classNames('input', {
        error: error,
        disabled: disabled,
      })}
    >
      {!disabled &&
        withIcon &&
        (!error ? (
          type === 'password' ? (
            <Locker width={15} height={15} />
          ) : (
            <User width={15} height={15} fill='red' />
          )
        ) : (
          <AlertYellow width={15} height={15} />
        ))}
      <div className='input-container'>
        <label
          className={classNames({ error: error })}
          htmlFor={`input-${name}`}
        >
          {label}
        </label>
        <input
          {...register(name)}
          type={inputType}
          name={name}
          id={`input-${name}`}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      {!disabled &&
        (type === 'password' ? (
          togglePw ? (
            <img
              className='showPassword'
              src={EyeCross}
              alt='EyeCross'
              onClick={() => {
                setTogglePw(false);
                setInputType(type);
              }}
            />
          ) : (
            <img
              className='hidePassword'
              src={Eye}
              alt='Eye'
              onClick={() => {
                setTogglePw(true);
                setInputType('text');
              }}
            />
          )
        ) : (
          error && <AlertYellow width={15} height={15} />
        ))}
    </div>
  );
};

Input.defaultProps = {
  register: () => {},
  type: 'text',
  placeholder: undefined,
  error: false,
  withIcon: false,
  label: undefined,
  disabled: false,
  onChange: () => {},
};

Input.propTypes = {
  register: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password', 'number', 'email']),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  withIcon: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Input;
