import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const HeaderCell = ({ children }) => {
  return (
    <th className='table-header-cell'>
      <div>{children}</div>
    </th>
  );
};

HeaderCell.defaultProps = {
  children: undefined,
};

HeaderCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default HeaderCell;
