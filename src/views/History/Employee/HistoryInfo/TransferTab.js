import React from 'react';

import Table from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown, Filter } from 'assets/images';
import tempTransferData from './tempTransferData';

const TransferTab = () => {
  const headerTable = (
    <HeaderTable>
      <HeaderCell key='receiveAccount'>Receive account</HeaderCell>
      <HeaderCell key='amount'>Amount</HeaderCell>
      <HeaderCell key='bank'>Bank</HeaderCell>
      <HeaderCell key='status'>
        Status <Filter fill='white' />
      </HeaderCell>
      <HeaderCell key='date'>
        Date <ArrowDown />
      </HeaderCell>
    </HeaderTable>
  );
  return (
    <Table
      widths={[20, 15, 15, 20, 30]}
      headerTable={headerTable}
      dataTable={tempTransferData}
    >
      <RowCell title='receiveAccount' />
      <RowCell title='amount' />
      <RowCell title='bank' />
      <RowCell title='status' />
      <RowCell title='date' />
    </Table>
  );
};

export default TransferTab;
