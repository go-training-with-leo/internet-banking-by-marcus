import React from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown } from 'assets/images';
import recvData from './recvData';

const headerTable = (
  <HeaderTable>
    <HeaderCell> </HeaderCell>
    <HeaderCell>Sender account</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>Bank</HeaderCell>
    <HeaderCell>
      Date <ArrowDown />
    </HeaderCell>
  </HeaderTable>
);
const ReceiveTable = () => {
  return (
    <Table widths={[10, 25, 25, 20, 20]} headerTable={headerTable}>
      {recvData.map(({ id, senderAccount, amount, bank, date }, index) => (
        <TableRow key={id}>
          <RowCell>{index + 1}</RowCell>
          <RowCell>{senderAccount}</RowCell>
          <RowCell>{amount}</RowCell>
          <RowCell>{bank}</RowCell>
          <RowCell>{date}</RowCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default ReceiveTable;
