import { DeleteIcon, PlusIcon, Search } from 'assets/images';
import IconButton from 'components/Button/Icon';
import Input from 'components/Input';
import Table from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import React from 'react';
import { useForm } from 'react-hook-form';

import './style.scss';

const dataTable = [
  {
    id: 'CM1',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM2',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM3',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM4',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM5',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM6',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM7',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM8',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM9',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM10',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM11',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM12',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
  {
    id: 'CM13',
    account: 'Wasif',
    phone: 21,
    email: 'wasif@email.com',
    actions: 'unpaid',
  },
];

const Employees = () => {
  const { register, getValues } = useForm();

  console.warn(getValues('email'));

  const headerTable = (
    <HeaderTable>
      <HeaderCell key='account'>Account</HeaderCell>
      <HeaderCell key='phone'>Phone</HeaderCell>
      <HeaderCell key='age'>Email</HeaderCell>
      <HeaderCell key='actions'>Actions</HeaderCell>
    </HeaderTable>
  );

  return (
    <div className='employees-view'>
      <div className='search-bar'>
        <div className='search-bar__input'>
          <Input
            register={register}
            name='email'
            label='Email or ID'
            placeholder='Enter email or ID'
          />
        </div>
        <div className='search-bar__btn'>
          <IconButton danger>
            <Search width={20} height={20} fill='white' />
          </IconButton>
        </div>
      </div>
      <div className='employees-table'>
        <Table
          widths={[25, 25, 25, 25]}
          headerTable={headerTable}
          dataTable={dataTable}
        >
          <RowCell title='account' />
          <RowCell title='phone' />
          <RowCell title='age' />
          <RowCell title='actions'>
            <PlusIcon width={20} height={20} />
            <DeleteIcon width={20} height={20} />
          </RowCell>
        </Table>
      </div>
    </div>
  );
};

export default Employees;
