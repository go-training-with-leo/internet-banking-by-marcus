import { ArrowDown, Filter } from 'assets/images';
import Table, { TableRow } from 'components/Table';
import HeaderTable from 'components/Table/Header';
import HeaderCell from 'components/Table/HeaderCell';
import RowCell from 'components/Table/RowCell';
import { selectCard, selectHistory } from 'core/selectors';
import { getDebtHistories } from 'global/redux/history/thunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  convertTimestamp,
  divideSpaceIdCard,
  parseMoneyVnd,
} from 'utils/helpers';

const headerTable = (
  <HeaderTable>
    <HeaderCell> </HeaderCell>
    <HeaderCell>Lender/Borrower</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>
      Type <ArrowDown width={20} height={20} fill='white' />
    </HeaderCell>
    <HeaderCell>
      Status <Filter width={20} height={20} fill='white' />
    </HeaderCell>
    <HeaderCell>
      Date <ArrowDown />
    </HeaderCell>
  </HeaderTable>
);

const DebtTable = () => {
  const dispatch = useDispatch();

  const { payingCard } = useSelector(selectCard);
  const { debtHistories, isDebtHistoryFetched: isFetched } =
    useSelector(selectHistory);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getDebtHistories({ cardNumber: payingCard?.cardNumber }));
    }
  }, [isFetched]);
  return debtHistories?.length > 0 ? (
    <Table widths={[10, 20, 20, 15, 15, 20]} headerTable={headerTable}>
      {debtHistories?.map(
        ({ id, from, totalAmount, role, status, createdAt }, index) => (
          <TableRow key={id}>
            <RowCell>{index + 1}</RowCell>
            <RowCell>
              <p>
                {from?.accountName}
                <br />
                <br />
                {divideSpaceIdCard(from?.cardNumber)}
              </p>
            </RowCell>
            <RowCell>{parseMoneyVnd(totalAmount)} VND</RowCell>
            <RowCell title='debtType'>{role}</RowCell>
            <RowCell title='status'>{status}</RowCell>
            <RowCell>
              {createdAt?.seconds
                ? convertTimestamp(createdAt.seconds * 1000)
                : convertTimestamp(createdAt)}
            </RowCell>
          </TableRow>
        )
      )}
    </Table>
  ) : (
    <span>No debts</span>
  );
};

export default DebtTable;
