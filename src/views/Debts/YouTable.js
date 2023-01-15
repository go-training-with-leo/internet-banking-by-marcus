import React from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { DeleteIcon, Filter, Info } from 'assets/images';

import yourDebts from './yourDebts';

const headerTable = (
  <HeaderTable>
    <HeaderCell>Debt account</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>
      Status <Filter fill='white' />
    </HeaderCell>
    <HeaderCell>Actions</HeaderCell>
  </HeaderTable>
);

const YouTable = () => {
  return (
    <Table widths={[30, 25, 20, 25]} headerTable={headerTable}>
      {yourDebts.map(({ id, debtAccount, amount, status }, index) => (
        <TableRow key={id}>
          <RowCell>{index + 1}</RowCell>
          <RowCell>{debtAccount}</RowCell>
          <RowCell>{amount}</RowCell>
          <RowCell title='status'>{status}</RowCell>
          <RowCell>
            <Info width={30} height={30} fill='red' />
            <DeleteIcon width={30} height={30} fill='red' />
          </RowCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default YouTable;
