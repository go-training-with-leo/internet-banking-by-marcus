import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuid } from 'uuid';

import classNames from 'classnames';

import './style.scss';

const TableRow = ({ children, onClick }) => {
  return (
    <tr className='table-body-row' onClick={onClick}>
      {children}
    </tr>
  );
};

const Table = ({ children, headerTable, widths }) => {
  return (
    <table className='table'>
      <colgroup>
        {widths.map((width) => {
          return (
            <col
              key={uuid()}
              span={1}
              className={classNames({ [`col-${width + 1}`]: width + 1 })}
            />
          );
        })}
      </colgroup>
      <thead>{headerTable}</thead>
      <tbody>{children}</tbody>
    </table>
  );
};

TableRow.defaultProps = {
  children: null,
  onClick: () => {},
};

TableRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  onClick: PropTypes.func,
};

Table.defaultProps = {
  headerTable: undefined,
  children: undefined,
  widths: [],
};

Table.propTypes = {
  headerTable: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  widths: PropTypes.array,
};

export { TableRow };
export default Table;
