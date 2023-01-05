import React from 'react';
import { render } from '@testing-library/react';

import Table from 'components/Table';
import RowCell from 'components/Table/Cell/Row';
import HeaderTable from 'components/Table/Header';
import { DeleteIcon, PlusIcon } from 'assets/images';
import HeaderCell from 'components/Table/Cell/Header';

describe('Test Table', () => {
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
  it('Test Props', () => {
    const headerTable = (
      <HeaderTable>
        <HeaderCell key='id'>Id</HeaderCell>
        <HeaderCell key='name'>Name</HeaderCell>
        <HeaderCell key='age'>Age</HeaderCell>
        <HeaderCell key='email'>
          Email <PlusIcon />
        </HeaderCell>
        <HeaderCell key='status'>Status</HeaderCell>
        <HeaderCell key='actions'>Actions</HeaderCell>
      </HeaderTable>
    );
    const tree = render(
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

    const table = tree.container.querySelector('tbody');

    expect(table).toHaveTextContent('Id');
    expect(table).toHaveTextContent('Name');
    expect(table).toHaveTextContent('Age');
    expect(table).toHaveTextContent('Email');
    expect(table).toHaveTextContent('Actions');

    expect(table).toHaveTextContent('wasif@email.com');
    expect(table).toHaveTextContent('Wasif');
    expect(tree).toMatchSnapshot();
  });
});
