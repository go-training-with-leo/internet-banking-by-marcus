import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { ArrowDown } from 'assets/images';
import { selectHistory } from 'core/selectors';
import { getAllHistories } from 'global/redux/history/thunk';
import { convertTimestamp, parseMoneyVnd } from 'utils/helpers';

const ReceiveTab = ({ customer }) => {
  const dispatch = useDispatch();

  const { allHistories, isAllHistoriesFetched: isFetched } =
    useSelector(selectHistory);

  const [receives, setReceive] = useState([]);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getAllHistories());
    } else {
      const filteredReceives = allHistories?.filter(
        (history) =>
          history.dest.cardNumber === customer?.cardNumber &&
          history.type === 'TRANSFER'
      );
      setReceive(filteredReceives);
    }
  }, [customer]);

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

  return receives?.length > 0 ? (
    <Table widths={[10, 25, 25, 20, 20]} headerTable={headerTable}>
      {receives?.map(({ from, totalAmount, createdAt }, index) => (
        <TableRow key={createdAt}>
          <RowCell>{index + 1}</RowCell>
          <RowCell>{from?.accountName}</RowCell>
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

export default ReceiveTab;
