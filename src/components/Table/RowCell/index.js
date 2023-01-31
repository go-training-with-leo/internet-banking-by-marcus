import React from 'react';
import PropTypes from 'prop-types';

import DebtType from 'components/DebtType';
import Status from 'components/Status';

import './style.scss';

const debtType = {
  debt: <DebtType type='debt' />,
  loan: <DebtType type='loan' />,
};

const statusIcons = {
  failed: <Status failed />,
  pending: <Status pending />,
  success: <Status success />,
  refund: <Status refund />,
  paid: <Status paid />,
  unpaid: <Status unpaid />,
  canceled: <Status canceled />,
};

const RowCell = ({ title, children, width }) => {
  return (
    <td colSpan={width} className='body-table-cell'>
      <div>
        {title === 'debtType' && debtType[children]}
        {title === 'status' && statusIcons[children]}
        {title !== 'debtType' && title !== 'status' && children}
      </div>
    </td>
  );
};

RowCell.defaultProps = {
  width: undefined,
  title: undefined,
  children: undefined,
};

RowCell.propTypes = {
  width: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default RowCell;
