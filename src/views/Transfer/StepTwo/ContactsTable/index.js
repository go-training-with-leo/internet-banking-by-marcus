import React, { useEffect } from 'react';

import Table, { TableRow } from 'components/Table';
import RowCell from 'components/Table/RowCell';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransferInfo } from 'global/redux/transfer/slice';
import { selectAuth, selectContact, selectTransfer } from 'core/selectors';
import { getContacts } from 'global/redux/contact/thunk';
import { divideSpaceIdCard } from 'utils/helpers';

const headerTable = (
  <HeaderTable>
    <HeaderCell>Name</HeaderCell>
    <HeaderCell>Card number</HeaderCell>
    <HeaderCell>Bank</HeaderCell>
  </HeaderTable>
);

const ContactsTable = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(selectAuth);
  const { contacts, isFetched } = useSelector(selectContact);
  const { transferInfo } = useSelector(selectTransfer);

  const handleClick = (contact) => {
    const { id: contactId, contactName, cardNumber, bank } = contact;
    dispatch(
      updateTransferInfo({
        dest: {
          contactId,
          contactName,
          cardNumber,
          bank,
        },
      })
    );
  };

  useEffect(() => {
    if (!isFetched) {
      dispatch(getContacts({ email: currentUser?.email }));
    }
  }, []);

  return contacts?.length > 0 ? (
    <div className='step-two-table'>
      {contacts?.length > 0 ? (
        <Table widths={[35, 46, 10]} headerTable={headerTable} small>
          {contacts.map((row) => (
            <TableRow
              key={row?.id}
              onClick={() => handleClick(row)}
              isHover
              isSelected={row?.id === transferInfo?.dest?.contactId}
            >
              <RowCell title='name'>{row?.contactName}</RowCell>
              <RowCell title='cardNumber'>
                {divideSpaceIdCard(row?.cardNumber)}
              </RowCell>
              <RowCell title='bank'>{row?.bank}</RowCell>
            </TableRow>
          ))}
        </Table>
      ) : (
        <span>No contact</span>
      )}
    </div>
  ) : (
    <span>No contacts</span>
  );
};

export default ContactsTable;
