import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const HeaderCell = ({ children, key }) => {
  return (
    <th className='table-header-cell' key={key}>
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
