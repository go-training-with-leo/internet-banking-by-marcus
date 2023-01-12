import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Loading } from 'assets/images';

import 'components/Loader/style.scss';

const Loader = ({ small, medium, large }) => {
  return (
    <Loading
      className={classNames('loader', {
        medium: medium,
        small: small,
        large: large,
      })}
    />
  );
};

Loader.defaultProps = {
  small: false,
  medium: true,
  large: false,
};

Loader.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};

export default Loader;
