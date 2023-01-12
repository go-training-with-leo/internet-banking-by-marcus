import React from 'react';
import PropTypes from 'prop-types';

import DebtType from 'components/DebtType';
import Status from 'components/Status';

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

const RowCell = ({ title, children }) => {
  return (
    <td className='body-table-cell'>
      <div>
        {title === 'debtType'
          ? debtType[debt]
          : title === 'status'
            ? statusIcons[children]
            : children}
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
