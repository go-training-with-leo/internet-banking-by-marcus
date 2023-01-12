import React from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown, Filter } from 'assets/images';
import tempTransferData from './tempTransferData';

const TransferTab = () => {
  const headerTable = (
    <HeaderTable>
      <HeaderCell>Receive account</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
      <HeaderCell>Bank</HeaderCell>
      <HeaderCell>
        Status <Filter fill='white' />
      </HeaderCell>
      <HeaderCell>
        Date <ArrowDown />
      </HeaderCell>
    </HeaderTable>
  );
  return (
    <Table widths={[20, 15, 15, 20, 30]} headerTable={headerTable}>
      {tempTransferData.map(
        ({ id, receiveAccount, amount, bank, status, date }, index) => (
          <TableRow key={id}>
            <RowCell>{index + 1}</RowCell>
            <RowCell title='receiveAccount'>{receiveAccount}</RowCell>
            <RowCell title='amount'>{amount}</RowCell>
            <RowCell title='bank'>{bank}</RowCell>
            <RowCell title='status'>{status}</RowCell>
            <RowCell title='date'>{date}</RowCell>
          </TableRow>
        )
      )}
    </Table>
  );
};

export default TransferTab;
