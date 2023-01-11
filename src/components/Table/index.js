import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './style.scss';

const Table = ({ dataTable, children, headerTable, widths }) => {
  const titles = dataTable !== undefined ? Object.keys(dataTable[0]) : null;

  const renderActions = () => {
    const foundedActions = children?.find((child) => {
      return child?.props?.title === 'actions';
    });
    return foundedActions;
  };

  const renderData = dataTable?.map((row, index) => {
    return (
      <tr className='table-body-row' key={row?.id}>
        <td className='order'>{index + 1}</td>
        {titles?.map((title) => {
          const foundedChild = children?.find((child) => {
            return child?.props?.title === title;
          });

          return foundedChild !== undefined
            ? cloneElement(
              children?.find((child) => {
                return child?.props?.title === title;
              }),
              { children: row[title] }
            )
            : foundedChild;
        })}
        {renderActions()}
      </tr>
    );
  });

  return (
    <table className='table'>
      <colgroup>
        <col span={1} className='col-10' />
        {widths.map((width) => {
          return (
            <col
              span={1}
              className={classNames({ [`col-${width + 1}`]: width + 1 })}
            />
          );
        })}
      </colgroup>
      <thead>{headerTable}</thead>
      <tbody>{renderData}</tbody>
    </table>
  );
};

Table.defaultProps = {
  dataTable: undefined,
  headerTable: undefined,
  children: undefined,
  widths: [],
};

Table.propTypes = {
  dataTable: PropTypes.array,
  headerTable: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  widths: PropTypes.array,
};

export default Table;
