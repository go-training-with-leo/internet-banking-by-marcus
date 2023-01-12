import React from 'react';

import Table from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import Modal from 'components/Modal';
import RowCell from 'components/Table/RowCell';
import { DeleteIcon, Edit } from 'assets/images';
import tempData from './tempData';

import './style.scss';

const Contacts = () => {
  const headerTable = (
    <HeaderTable>
      <HeaderCell key='name'>Name</HeaderCell>
      <HeaderCell key='cardNumber'>Card number</HeaderCell>
      <HeaderCell key='bank'>Bank</HeaderCell>
      <HeaderCell key='actions'>Actions</HeaderCell>
    </HeaderTable>
  );

  return (
    <div className='contacts-view'>
      <div className='contacts-table'>
        <Table
          widths={[25, 25, 25, 25]}
          headerTable={headerTable}
          dataTable={tempData}
        >
          <RowCell title='name' />
          <RowCell title='cardNumber' />
          <RowCell title='bank' />
          <RowCell title='actions'>
            <Edit
              width={20}
              height={20}
              fill='red'
              onClick={(row) => console.warn(row)}
            />
            <DeleteIcon
              width={20}
              height={20}
              fill='red'
              onClick={(row) => console.warn('Delete', row)}
            />
          </RowCell>
        </Table>
      </div>
      <Modal cancel title='Edit contact' clickOutSide>
        <div>fs</div>
      </Modal>
    </div>
  );
};

export default Contacts;
