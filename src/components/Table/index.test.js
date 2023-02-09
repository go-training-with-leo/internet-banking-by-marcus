import React from 'react';
import { render } from '@testing-library/react';

import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import Table, { TableRow } from 'components/Table';
import RowCell from 'components/Table/RowCell';

import { DeleteIcon, PlusIcon } from 'assets/images';

describe('Test Table', () => {
  const dataTable = [
    {
      id: 'CM1',
      name: 'Wasif',
      age: 21,
      email: 'wasif@email.com',
      type: 'loan',
      status: 'unpaid',
    },
    { id: 'CM2', name: 'Ali', age: 19, email: 'ali@email.com', status: 'paid' },
    {
      id: 'CM3',
      name: 'Saad',
      age: 16,
      email: 'saad@email.com',
      type: 'debt',
      status: 'canceled',
    },
    {
      id: 'CM4',
      name: 'Asad',
      age: 25,
      email: 'asad@email.com',
      type: 'loan',
      status: 'success',
    },
    {
      id: 'CM5',
      name: 'Asad',
      age: 25,
      email: 'asad@email.com',
      type: 'loan',
      status: 'success',
    },
    {
      id: 'CM6',
      name: 'Asad',
      age: 25,
      email: 'asad@email.com',
      type: 'debt',
      status: 'success',
    },
    {
      id: 'CM7',
      name: 'Asad',
      age: 25,
      email: 'asad@email.com',
      type: 'debt',
      status: 'success',
    },
  ];
  it('Test Props', () => {
    const headerTable = (
      <HeaderTable>
        <HeaderCell>Id</HeaderCell>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Age</HeaderCell>
        <HeaderCell>
          Email <PlusIcon />
        </HeaderCell>
        <HeaderCell>Status</HeaderCell>
        <HeaderCell>Type</HeaderCell>
        <HeaderCell>Actions</HeaderCell>
      </HeaderTable>
    );
    const tree = render(
      <Table widths={[10, 20, 20, 20, 20, 20]} headerTable={headerTable}>
        {dataTable?.map((data) => (
          <TableRow key={data.id}>
            <RowCell title='id'>{data.id}</RowCell>
            <RowCell title='name'>{data.name}</RowCell>
            <RowCell title='age'>{data.age}</RowCell>
            <RowCell title='email'>{data.email}</RowCell>
            <RowCell title='status'>{data.status}</RowCell>
            <RowCell title='debtType'>{data.type}</RowCell>
            <RowCell title='actions'>
              <PlusIcon width={20} height={20} />
              <DeleteIcon width={20} height={20} />
            </RowCell>
          </TableRow>
        ))}
      </Table>
    );

    const table = tree.container.querySelector('tbody');

    expect(table).toHaveTextContent('wasif@email.com');
    expect(table).toHaveTextContent('Wasif');
    expect(tree).toMatchSnapshot();
  });
});
