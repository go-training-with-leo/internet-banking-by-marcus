import React, { useEffect } from 'react';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown } from 'assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { selectCard, selectHistory } from 'core/selectors';
import { getRecHistories } from 'global/redux/history/thunk';
import { convertTimestamp, parseMoneyVnd } from 'utils/helpers';

const headerTable = (
  <HeaderTable>
    <HeaderCell> </HeaderCell>
    <HeaderCell>Sender account</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>Bank</HeaderCell>
    <HeaderCell>
      Date <ArrowDown />
    </HeaderCell>
  </HeaderTable>
);

const ReceiveTable = () => {
  const dispatch = useDispatch();

  const { payingCard } = useSelector(selectCard);
  const { recvHistories, isRecHistoryFetched: isFetched } =
    useSelector(selectHistory);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getRecHistories({ cardNumber: payingCard?.cardNumber }));
    }
  }, [isFetched]);

  return recvHistories?.length > 0 ? (
    <Table widths={[10, 25, 25, 20, 20]} headerTable={headerTable}>
      {recvHistories?.map(({ from, totalAmount, createdAt }, index) => (
        <TableRow key={createdAt}>
          <RowCell>{index + 1}</RowCell>
          <RowCell>
            <p>
              {from?.accountName}
              <br />
              <br />
              {from?.cardNumber}
            </p>
          </RowCell>
          <RowCell>{parseMoneyVnd(totalAmount)} VND</RowCell>
          <RowCell>{from?.bank}</RowCell>
          <RowCell>{convertTimestamp(createdAt.seconds * 1000)}</RowCell>
        </TableRow>
      ))}
    </Table>
  ) : (
    <span>No Receive</span>
  );
};

export default ReceiveTable;
