import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import useToggle from 'components/hooks/useToggle';
import RowCell from 'components/Table/RowCell';
import { DeleteIcon, Edit } from 'assets/images';
import { getContacts } from 'global/redux/contact/thunk';
import { selectAuth, selectContact } from 'core/selectors';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

import './style.scss';

const Contacts = () => {
  const dispatch = useDispatch();

  const [isShownEdit, toggleEdit] = useToggle();
  const [isShownDelete, toggleDelete] = useToggle();

  const { currentUser } = useSelector(selectAuth);
  const { contacts } = useSelector(selectContact);

  const headerTable = (
    <HeaderTable>
      <HeaderCell> </HeaderCell>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell>Card number</HeaderCell>
      <HeaderCell>Bank</HeaderCell>
      <HeaderCell>Actions</HeaderCell>
    </HeaderTable>
  );

  useEffect(() => {
    dispatch(getContacts({ email: currentUser?.email }));
  }, [currentUser]);

  return (
    <div className='contacts-view'>
      <div className='contacts-table'>
        <Table widths={[10, 25, 25, 25, 10]} headerTable={headerTable}>
          {contacts.map((row, index) => {
            return (
              <TableRow key={row?.id}>
                <RowCell>{index + 1}</RowCell>
                <RowCell>{row?.contactName}</RowCell>
                <RowCell>{row?.cardNumber}</RowCell>
                <RowCell>EIGHT.Bank</RowCell>
                <RowCell>
                  <Edit
                    fill='red'
                    width={20}
                    height={20}
                    onClick={toggleEdit}
                  />
                  <DeleteIcon
                    fill='red'
                    width={20}
                    height={20}
                    onClick={toggleDelete}
                  />
                </RowCell>
              </TableRow>
            );
          })}
        </Table>
      </div>
      {isShownEdit && <EditModal setToggle={toggleEdit} />}
      {isShownDelete && <DeleteModal setToggle={toggleDelete} />}
    </div>
  );
};

export default Contacts;
