import React from 'react';

import Table from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown } from 'assets/images';
import tempReceiveData from './tempReceiveData';

const ReceiveTab = () => {
  const headerTable = (
    <HeaderTable>
      <HeaderCell key='senderAccount'>Sender account</HeaderCell>
      <HeaderCell key='amount'>Amount</HeaderCell>
      <HeaderCell key='bank'>Bank</HeaderCell>
      <HeaderCell key='date'>
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
      <RowCell title='senderAccount' />
      <RowCell title='amount' />
      <RowCell title='bank' />
      <RowCell title='date' />
    </Table>
  );
};

export default ReceiveTab;
