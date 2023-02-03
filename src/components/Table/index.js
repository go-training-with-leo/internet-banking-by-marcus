import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuid } from 'uuid';

import classNames from 'classnames';

import './style.scss';

const TableRow = ({ children, onClick, isSelected, isHover }) => {
  return (
    <tr
      className={classNames('table-body-row', {
        isHover: isHover,
        isSelected: isSelected,
      })}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const Table = ({ children, headerTable, widths, small }) => {
  return (
    <table className={classNames('table', { small: small })}>
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
  isSelected: false,
  isHover: false,
  onClick: () => {},
};

TableRow.propTypes = {
  isSelected: PropTypes.bool,
  isHover: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  onClick: PropTypes.func,
};

Table.defaultProps = {
  headerTable: undefined,
  children: undefined,
  small: false,
  // medium: false,
  // large: false,
  widths: [],
};

Table.propTypes = {
  headerTable: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  small: PropTypes.bool,
  // medium: PropTypes.bool,
  // large: PropTypes.bool,
  widths: PropTypes.array,
};

export { TableRow };
export default Table;
