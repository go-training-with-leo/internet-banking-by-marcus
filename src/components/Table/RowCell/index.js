import React from 'react';
import PropTypes from 'prop-types';

import Status from 'components/Status';
import DebtType from 'components/DebtType';

import './style.scss';

const debtType = {
  debt: <DebtType debt />,
  loan: <DebtType loan />,
};

const statusIcons = {
  failed: <Status failed />,
  success: <Status success />,
  refund: <Status refund />,
  paid: <Status paid />,
  canceled: <Status canceled />,
};

const RowCell = ({ title, children, width }) => {
  return (
    <td colSpan={width} className='body-table-cell'>
      <div>
        {title === 'debtType'
          ? debtType[children]
          : title === 'status'
            ? statusIcons[children]
            : children}
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
