import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCard, selectDebt } from 'core/selectors';

import HeaderTable from 'components/Table/Header';
import RowCell from 'components/Table/RowCell';
import HeaderCell from 'components/Table/HeaderCell';
import useToggle from 'components/hooks/useToggle';
import Table, { TableRow } from 'components/Table';
import { getCreDebts, getRecDebts } from 'global/redux/debt/thunk';
import { parseMoneyVnd } from 'utils/helpers';
import {
  CreditCard,
  CreditCardDone,
  CreditCardGradient,
  Filter,
  Info,
} from 'assets/images';
import DeleteModal from './DeleteModal';
import DetailModal from './DetailModal';
import PaymentModal from './PaymentModal';

import './style.scss';

const CREATE_BY_YOU = 'CREATE_BY_YOU';
const RECV_FROM_OTHERS = 'RECV_FROM_OTHERS';

const headerTable = (
  <HeaderTable>
    <HeaderCell> </HeaderCell>
    <HeaderCell>Debt account</HeaderCell>
    <HeaderCell>Amount</HeaderCell>
    <HeaderCell>
      Status <Filter fill='white' />
    </HeaderCell>
    <HeaderCell>Actions</HeaderCell>
  </HeaderTable>
);

const Debts = () => {
  const dispatch = useDispatch();

  const [deleteModal, setDeleteModal] = useToggle();
  const [paymentModal, setPaymentModal] = useToggle();
  const [infoModal, setInfoModal] = useToggle();
  const [activeTab, setActiveTab] = useState(CREATE_BY_YOU);
  const [dataTable, setDataTable] = useState([]);
  const [chooseRow, setChooseRow] = useState({});

  const { payingCard } = useSelector(selectCard);
  const { creDebts, recDebts, isCreDebtsFetched, isRecDebtsFetched } =
    useSelector(selectDebt);

  const dataTables = {
    CREATE_BY_YOU: creDebts,
    RECV_FROM_OTHERS: recDebts,
  };

  const handleClickAction = ({ type, row }) => {
    switch (type) {
    case 'detail': {
      setChooseRow(row);
      setInfoModal();
      break;
    }
    case 'delete': {
      setChooseRow(row);
      setDeleteModal();
      break;
    }
    case 'payment': {
      setChooseRow(row);
      setPaymentModal();
      break;
    }
    default:
      break;
    }
  };

  useEffect(() => {
    setDataTable(dataTables[activeTab]);
  }, [creDebts, recDebts, activeTab]);

  useEffect(() => {
    if (!isCreDebtsFetched && activeTab === CREATE_BY_YOU) {
      dispatch(getCreDebts({ cardNumber: payingCard?.cardNumber }));
    }
    if (!isRecDebtsFetched && activeTab === RECV_FROM_OTHERS) {
      dispatch(getRecDebts({ cardNumber: payingCard?.cardNumber }));
    }
  }, [creDebts, recDebts, activeTab]);

  return (
    <div className='debt-view'>
      <div className='debt-view-tabs'>
        <span
          className={classNames({ active: activeTab === CREATE_BY_YOU })}
          onClick={() => setActiveTab(CREATE_BY_YOU)}
          role='tab'
          tabIndex={0}
        >
          Created by you
        </span>
        <span
          className={classNames({ active: activeTab === RECV_FROM_OTHERS })}
          onClick={() => setActiveTab(RECV_FROM_OTHERS)}
          role='tab'
          tabIndex={0}
        >
          Received from others
        </span>
      </div>
      <div className='debt-tables'>
        {dataTable ? (
          <Table widths={[10, 25, 25, 20, 20]} headerTable={headerTable}>
            {dataTable?.map((debt, index) => (
              <TableRow key={debt?.id}>
                <RowCell>{index + 1}</RowCell>
                <RowCell>{debt?.dest?.contactName}</RowCell>
                <RowCell>{parseMoneyVnd(debt?.totalAmount)} VND</RowCell>
                <RowCell title='status'>{debt?.status}</RowCell>
                <RowCell>
                  {activeTab === RECV_FROM_OTHERS &&
                    (debt?.status === 'unpaid' ? (
                      <CreditCardGradient
                        className='credit-svg'
                        width={30}
                        height={30}
                        onClick={() =>
                          handleClickAction({ type: 'payment', row: debt })
                        }
                        fill='linear-gradient(90deg, #EF230C 2.5%, #FFD351 100%)'
                      />
                    ) : (
                      <CreditCard
                        className='disabled-icon'
                        width={30}
                        height={30}
                        fill='#26292E'
                      />
                    ))}

                  {activeTab === RECV_FROM_OTHERS && (
                    <CreditCardDone
                      width={30}
                      height={30}
                      className={classNames({
                        'disabled-icon':
                          debt?.status === 'pending' ||
                          debt?.status === 'success',
                      })}
                      fill={
                        debt?.status === 'pending' || debt?.status === 'success'
                          ? '#26292E'
                          : 'red'
                      }
                      onClick={() => {
                        if (
                          debt?.status !== 'pending' &&
                          debt?.status !== 'success'
                        ) {
                          handleClickAction({ type: 'delete', row: debt });
                        }
                      }}
                    />
                  )}
                  <Info
                    width={30}
                    height={30}
                    fill='red'
                    onClick={() =>
                      handleClickAction({ type: 'detail', row: debt })
                    }
                  />
                </RowCell>
              </TableRow>
            ))}
          </Table>
        ) : (
          <span>No debts</span>
        )}
      </div>
      {paymentModal && (
        <PaymentModal debtDetail={chooseRow} setToggle={setPaymentModal} />
      )}
      {infoModal && (
        <DetailModal detailData={chooseRow} setToggle={setInfoModal} />
      )}
      {deleteModal && (
        <DeleteModal debtData={chooseRow} setToggle={setDeleteModal} />
      )}
    </div>
  );
};

export default Debts;
