import { ArrowDown, Filter } from 'assets/images';
import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import React from 'react';
import debtData from './debtData';

const headerTable = (
  <HeaderTable>
    <HeaderCell> </HeaderCell>
    <HeaderCell>Lender/Borrower</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>
      Type <ArrowDown width={20} height={20} fill='white' />
    </HeaderCell>
    <HeaderCell>
      Status <Filter width={20} height={20} fill='white' />
    </HeaderCell>
  </HeaderTable>
);

const DebtTable = () => {
  return (
    <Table widths={[10, 20, 20, 15, 15, 20]} headerTable={headerTable}>
      {debtData.map(({ id, lender, amount, type, status, date }, index) => (
        <TableRow key={id}>
          <RowCell>{index + 1}</RowCell>
          <RowCell>{lender}</RowCell>
          <RowCell>{amount}</RowCell>
          <RowCell title='debtType'>{type}</RowCell>
          <RowCell title='status'>{status}</RowCell>
          <RowCell>{date}</RowCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default DebtTable;
