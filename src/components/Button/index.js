import React from 'react';
import PropTypes from 'prop-types';

import 'components/Button/style.scss';

const Button = ({ children, onClick }) => {
  return (
    <div className='button' onClick={onClick} role='button' tabIndex={0}>
      {children}
    </div>
  );
};

Button.defaultProps = {
  onClick: undefined,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
