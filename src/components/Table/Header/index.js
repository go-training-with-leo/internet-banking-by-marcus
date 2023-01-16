import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const HeaderTable = ({ children }) => {
  return <tr className='table-header'>{children}</tr>;
};

HeaderTable.defaultProps = {
  children: undefined,
};

HeaderTable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default HeaderTable;
