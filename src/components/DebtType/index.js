import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const labels = {
  loan: 'LOAN',
  debt: 'DEBT',
};

const DebtType = ({ type }) => {
  return (
    <div className={classNames('debt-type', { [type]: type })}>
      {labels[type]}
    </div>
  );
};

DebtType.propTypes = {
  type: PropTypes.oneOf(['loan', 'debt']).isRequired,
};

export default DebtType;
