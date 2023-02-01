import React, { useEffect, useState } from 'react';
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
  const [chooseContact, setChooseContact] = useState();

  const { currentUser } = useSelector(selectAuth);
  const { contacts, isFetched } = useSelector(selectContact);

  const headerTable = (
    <HeaderTable>
      <HeaderCell> </HeaderCell>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell>Card number</HeaderCell>
      <HeaderCell>Bank</HeaderCell>
      <HeaderCell>Actions</HeaderCell>
    </HeaderTable>
  );

  const handleEdit = (contact) => {
    setChooseContact(contact);
    toggleEdit();
  };

  const handleDelete = (contact) => {
    setChooseContact(contact);
    toggleDelete();
  };

  useEffect(() => {
    if (currentUser && !isFetched) {
      dispatch(getContacts({ email: currentUser?.email }));
    }
  }, [currentUser]);

  return (
    <div className='contacts-view'>
      <div className='contacts-table'>
        {contacts?.length > 0 ? (
          <Table widths={[10, 25, 25, 25, 10]} headerTable={headerTable}>
            {contacts.map((row, index) => {
              return (
                <TableRow key={row?.id}>
                  <RowCell>{index + 1}</RowCell>
                  <RowCell>{row?.contactName}</RowCell>
                  <RowCell>{row?.cardNumber}</RowCell>
                  <RowCell>{row?.bank}</RowCell>
                  <RowCell>
                    <Edit
                      fill='red'
                      width={20}
                      height={20}
                      onClick={() => handleEdit(row)}
                    />
                    <DeleteIcon
                      fill='red'
                      width={20}
                      height={20}
                      onClick={() => handleDelete(row)}
                    />
                  </RowCell>
                </TableRow>
              );
            })}
          </Table>
        ) : (
          <span>No contacts</span>
        )}
      </div>
      {isShownEdit && (
        <EditModal contactData={chooseContact} setToggle={toggleEdit} />
      )}
      {isShownDelete && (
        <DeleteModal contactData={chooseContact} setToggle={toggleDelete} />
      )}
    </div>
  );
};

export default Contacts;
