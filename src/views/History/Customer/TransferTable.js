import React from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown, Filter } from 'assets/images';
import transferData from './transferData';

const headerTable = (
  <HeaderTable>
    <HeaderCell> </HeaderCell>
    <HeaderCell>Receive account</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>Bank</HeaderCell>
    <HeaderCell>
      Status <Filter />
    </HeaderCell>
    <HeaderCell>
      Date <ArrowDown />
    </HeaderCell>
  </HeaderTable>
);

const TransferTable = () => {
  return (
    <Table widths={[10, 20, 20, 15, 15, 20]} headerTable={headerTable}>
      {transferData.map(
        ({ id, receiverAccount, amount, bank, status, date }, index) => (
          <TableRow key={id}>
            <RowCell>{index + 1}</RowCell>
            <RowCell>{receiverAccount}</RowCell>
            <RowCell>{amount}</RowCell>
            <RowCell>{bank}</RowCell>
            <RowCell title='status'>{status}</RowCell>
            <RowCell>{date}</RowCell>
          </TableRow>
        )
      )}
    </Table>
  );
};

export default TransferTable;
