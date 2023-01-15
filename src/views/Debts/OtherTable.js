import React from 'react';

import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import Table, { TableRow } from 'components/Table';
import { DeleteIcon, Filter, Info } from 'assets/images';
import otherData from './otherData';

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

const OtherTable = () => {
  return (
    <Table widths={[30, 25, 20, 25]} headerTable={headerTable}>
      {otherData.map(({ id, debtAccount, amount, status }, index) => (
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

export default OtherTable;
