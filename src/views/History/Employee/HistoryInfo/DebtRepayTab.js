import React from 'react';

import Table from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown } from 'assets/images';
import tempDebtRepay from './tempDebtRepay';

const DebtRepayTab = () => {
  const headerTable = (
    <HeaderTable>
      <HeaderCell key='lenderAccount'>Lender/Borrower</HeaderCell>
      <HeaderCell key='amount'>Amount</HeaderCell>
      <HeaderCell key='debtType'>
        Type <ArrowDown />
      </HeaderCell>
      <HeaderCell key='status'>Status</HeaderCell>
      <HeaderCell key='date'>
        Date <ArrowDown />
      </HeaderCell>
    </HeaderTable>
  );
  return (
    <Table
      widths={[20, 20, 15, 15, 30]}
      headerTable={headerTable}
      dataTable={tempDebtRepay}
    >
      <RowCell title='lenderAccount' />
      <RowCell title='amount' />
      <RowCell title='debtType' />
      <RowCell title='status' />
      <RowCell title='date' />
    </Table>
  );
};

export default DebtRepayTab;
