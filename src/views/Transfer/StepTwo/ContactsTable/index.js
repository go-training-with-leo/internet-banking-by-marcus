import PropTypes from 'prop-types';
import React from 'react';

import Table, { TableRow } from 'components/Table';
import RowCell from 'components/Table/RowCell';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';

import './style.scss';
import { useDispatch } from 'react-redux';
import { updateTransferInfo } from 'global/redux/transfer/slice';

const headerTable = (
  <HeaderTable>
    <HeaderCell>Name</HeaderCell>
    <HeaderCell>Card number</HeaderCell>
    <HeaderCell>Bank</HeaderCell>
  </HeaderTable>
);

const ContactsTable = ({ tableData }) => {
  const dispatch = useDispatch();

  return (
    <div className='step-two-table'>
      <Table widths={[25, 46, 25]} headerTable={headerTable}>
        {tableData.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => dispatch(updateTransferInfo({ contactId: row.id }))}
          >
            <RowCell title='name'>{row?.contactName}</RowCell>
            <RowCell title='cardNumber'>{row?.cardNumber}</RowCell>
            <RowCell title='bank'>{row?.bank}</RowCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

ContactsTable.defaultProps = {
  tableData: [],
};

ContactsTable.propTypes = {
  tableData: PropTypes.array,
};

export default ContactsTable;
