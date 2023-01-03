import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const DebtType = ({ debt, loan }) => {
  return (
    <div className={classNames('debt-type', { debt: debt, loan: loan })}>
      {loan ? 'LOAN' : debt && 'DEBT'}
    </div>
  );
};

DebtType.defaultProps = {
  debt: false,
  loan: false,
};

DebtType.propTypes = {
  debt: PropTypes.bool,
  loan: PropTypes.bool,
};

export default DebtType;
