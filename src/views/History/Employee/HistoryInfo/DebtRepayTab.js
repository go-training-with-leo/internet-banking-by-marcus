import React from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown } from 'assets/images';
import tempDebtRepay from './tempDebtRepay';

const DebtRepayTab = () => {
  const headerTable = (
    <HeaderTable>
      <HeaderCell>Lender/Borrower</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
      <HeaderCell>
        Type <ArrowDown />
      </HeaderCell>
      <HeaderCell>Status</HeaderCell>
      <HeaderCell>
        Date <ArrowDown />
      </HeaderCell>
    </HeaderTable>
  );
  return (
    <Table widths={[20, 20, 15, 15, 30]} headerTable={headerTable}>
      {tempDebtRepay.map(
        ({ id, lenderAccount, amount, debtType, status, date }, index) => (
          <TableRow key={id}>
            <RowCell>{index + 1}</RowCell>
            <RowCell title='lenderAccount'>{lenderAccount}</RowCell>
            <RowCell title='amount'>{amount}</RowCell>
            <RowCell title='debtType'>{debtType}</RowCell>
            <RowCell title='status'>{status}</RowCell>
            <RowCell title='date'>{date}</RowCell>
          </TableRow>
        )
      )}
    </Table>
  );
};

export default DebtRepayTab;
