import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Table = ({ dataTable, children, headerTable }) => {
  const titles = dataTable.length !== 0 ? Object.keys(dataTable[0]) : null;

  const renderActions = () => {
    const foundedActions = children?.find((child) => {
      return child?.props?.title === 'actions';
    });
    return foundedActions;
  };

  const renderData = dataTable?.map((row, index) => {
    return (
      <tr className='table-body-row'>
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
      <tbody>
        {headerTable}
        {renderData}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  dataTable: undefined,
  headerTable: undefined,
  children: undefined,
};

Table.propTypes = {
  dataTable: PropTypes.array,
  headerTable: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default Table;
