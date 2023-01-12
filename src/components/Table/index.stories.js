import React from 'react';

import { DeleteIcon, PlusIcon } from 'assets/images';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import HeaderTable from 'components/Table/Header';
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
    <HeaderCell>ID</HeaderCell>
    <HeaderCell>Name</HeaderCell>
    <HeaderCell>Age</HeaderCell>
    <HeaderCell>
      Email <PlusIcon />
    </HeaderCell>
    <HeaderCell>Status</HeaderCell>
    <HeaderCell>Actions</HeaderCell>
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
