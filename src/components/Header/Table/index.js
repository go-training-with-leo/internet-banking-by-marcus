import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const HeaderTable = ({ children }) => {
  // const renderHeader = children?.map((headerCell) => {
  //   return (
  //     <th className='table-header-cell' key={headerCell?.key}>
  //       {headerCell}
  //     </th>
  //   );
  // });

  return (
    <tr className='table-header'>
      <th>&nbsp;</th>
      {children}
    </tr>
  );
};

HeaderTable.defaultProps = {
  children: undefined,
};

HeaderTable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default HeaderTable;
