import React from 'react';
import DebtType from 'components/DebtType';
import PropTypes from 'prop-types';

import './style.scss';
import Status from 'components/Status';

const RowCell = ({ title, children }) => {
  return (
    <td className='body-table-cell'>
      <div>
        {title === 'debtType' ? (
          children === 'debt' ? (
            <DebtType debt />
          ) : (
            <DebtType loan />
          )
        ) : title === 'status' ? (
          children === 'failed' ? (
            <Status failed />
          ) : children === 'success' ? (
            <Status success />
          ) : children === 'refund' ? (
            <Status refund />
          ) : children === 'paid' ? (
            <Status paid />
          ) : children === 'canceled' ? (
            <Status paid />
          ) : (
            children === 'unpaid' && <Status unpaid />
          )
        ) : (
          children
        )}
      </div>
    </td>
  );
};

RowCell.defaultProps = {
  title: undefined,
  children: undefined,
};

RowCell.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default RowCell;
