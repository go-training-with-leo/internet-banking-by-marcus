import React from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown } from 'assets/images';
import tempReceiveData from './tempReceiveData';

const ReceiveTab = () => {
  const headerTable = (
    <HeaderTable>
      <HeaderCell>Sender account</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
      <HeaderCell>Bank</HeaderCell>
      <HeaderCell>
        Date <ArrowDown />
      </HeaderCell>
    </HeaderTable>
  );
  return (
    <Table
      widths={[30, 20, 20, 30]}
      headerTable={headerTable}
      dataTable={tempReceiveData}
    >
      {tempReceiveData.map(
        ({ id, senderAccount, amount, bank, date }, index) => (
          <TableRow key={id}>
            <RowCell>{index + 1}</RowCell>
            <RowCell title='senderAccount'>{senderAccount}</RowCell>
            <RowCell title='amount'>{amount}</RowCell>
            <RowCell title='bank'>{bank}</RowCell>
            <RowCell title='date'>{date}</RowCell>
          </TableRow>
        )
      )}
    </Table>
  );
};

export default ReceiveTab;
