import React from 'react';

import HeaderCell from 'components/TableCell/Header';
import RowCell from 'components/TableCell/Row';
import HeaderTable from 'components/Header/Table';
import { DeleteIcon, PlusIcon } from 'assets/images';
import Table from '.';

export default {
  title: 'Table',
  component: Table,
};

const dataTable = [
  {
    id: 'CM1',
    name: 'Wasif',
    age: 21,
    email: 'wasif@email.com',
    status: 'unpaid',
  },
  { id: 'CM2', name: 'Ali', age: 19, email: 'ali@email.com', status: 'paid' },
  {
    id: 'CM3',
    name: 'Saad',
    age: 16,
    email: 'saad@email.com',
    status: 'canceled',
  },
  {
    id: 'CM4',
    name: 'Asad',
    age: 25,
    email: 'asad@email.com',
    status: 'success',
  },
  {
    id: 'CM5',
    name: 'Asad',
    age: 25,
    email: 'asad@email.com',
    status: 'success',
  },
  {
    id: 'CM6',
    name: 'Asad',
    age: 25,
    email: 'asad@email.com',
    status: 'success',
  },
  {
    id: 'CM7',
    name: 'Asad',
    age: 25,
    email: 'asad@email.com',
    status: 'success',
  },
];

const headerTable = (
  <HeaderTable>
    <HeaderCell key='id'>ID</HeaderCell>
    <HeaderCell key='name'>Name</HeaderCell>
    <HeaderCell key='age'>Age</HeaderCell>
    <HeaderCell key='email'>
      Email <PlusIcon />
    </HeaderCell>
    <HeaderCell key='status'>Status</HeaderCell>
    <HeaderCell key='actions'>Actions</HeaderCell>
  </HeaderTable>
);

const Default = () => (
  <Table dataTable={dataTable} headerTable={headerTable}>
    <RowCell title='id' />
    <RowCell title='name' />
    <RowCell title='age' />
    <RowCell title='email' />
    <RowCell title='status' />
    <RowCell title='actions'>
      <PlusIcon width={20} height={20} />
      <DeleteIcon width={20} height={20} />
    </RowCell>
  </Table>
);

export { Default };
