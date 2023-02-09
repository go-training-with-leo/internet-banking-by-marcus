import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import Card from 'components/Card/Default';
import ListCardItem from 'components/ListCardItem';
import Loader from 'components/Loader';
import { db } from 'services/firebase';
import { selectAccount, selectAuth, selectCard } from 'core/selectors';
import { getCards } from 'global/redux/card/thunk';
import { divideSpaceIdCard, get4LastDigit } from 'utils/helpers';
import { getCustAccount } from 'global/redux/account/thunk';
import { updateSavingCard } from 'global/redux/card/slice';

import { CreditCardDone, Info } from 'assets/images';
import useToggle from 'components/hooks/useToggle';
import DetailModal from './DetailModal';
import DepositModal from './DepositModal';

import './style.scss';

const CARD_DETAIL = 'CARD_DETAIL';
const CARD_DEPOSIT = 'CARD_DEPOSIT';

const Cards = () => {
  const ref = useRef(0);
  const dispatch = useDispatch();

  const [currentSavingCard, setCurrentSavingCard] = useState({});
  const [modal, setModal] = useState();
  const [showModal, setShowModal] = useToggle();

  const modals = {
    CARD_DETAIL: (
      <DetailModal cardDetail={currentSavingCard} setToggle={setShowModal} />
    ),
    CARD_DEPOSIT: (
      <DepositModal cardDetail={currentSavingCard} setToggle={setShowModal} />
    ),
  };

  const handleShowDeposit = () => {
    setShowModal();
    setModal(CARD_DEPOSIT);
  };

  const handleShowDetail = () => {
    setShowModal();
    setModal(CARD_DETAIL);
  };

  const {
    payingCard,
    savingCards,
    isLoading: loading,
  } = useSelector((state) => state.card);
  const { currentUser } = useSelector(selectAuth);
  const { isFetched, isDeleteSavingCardLoading: isDeleteLoading } =
    useSelector(selectCard);
  const { isFetched: isAccountsFetched } = useSelector(selectAccount);

  useEffect(() => {
    if (currentUser && !isFetched) {
      dispatch(getCards({ email: currentUser.email }));
    }
    if (!isAccountsFetched) {
      dispatch(getCustAccount({ email: currentUser?.email }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (savingCards?.length > 0) {
      setCurrentSavingCard(savingCards[ref.current]);
    }
  }, [isFetched, savingCards]);

  useEffect(() => {
    if (savingCards?.length > 0) {
      setCurrentSavingCard(savingCards[0]);
    }
  }, [isDeleteLoading]);

  useEffect(() => {
    const q = query(
      collection(db, 'savingCards'),
      where('email', '==', currentUser?.email ? currentUser?.email : '')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const data = change.doc.data();
          dispatch(updateSavingCard(data));
        }
      });
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className='cards-view'>
      <div className='paying-card'>
        <span className='paying-card__title'>Paying card</span>
        <Card
          isLoading={loading}
          expireTime='04 / 24'
          masterCard
          idCard={divideSpaceIdCard(payingCard?.cardNumber)}
        >
          {Number(payingCard?.balance)}
        </Card>
      </div>
      <div className='saving-card'>
        {loading ? (
          <Loader large />
        ) : (
          <>
            <div className='saving-card__container'>
              <span className='title'>Saving cards</span>
              {savingCards.length > 0 ? (
                <div className='saving-card-detail'>
                  <Card
                    isLoading={loading}
                    expireTime='04 / 24'
                    visaCard={currentSavingCard?.bank?.toLowerCase() === 'visa'}
                    masterCard={
                      currentSavingCard?.bank?.toLowerCase() === 'mastercard'
                    }
                    napasCard={
                      currentSavingCard?.bank?.toLowerCase() === 'napas'
                    }
                    idCard={divideSpaceIdCard(currentSavingCard?.cardNumber)}
                  >
                    {currentSavingCard?.balance}
                  </Card>
                  <div className='card-actions'>
                    <Info
                      className='action'
                      width={40}
                      height={40}
                      fill='red'
                      onClick={handleShowDetail}
                    />
                    <CreditCardDone
                      className='action'
                      width={40}
                      height={40}
                      fill='red'
                      onClick={handleShowDeposit}
                    />
                  </div>
                </div>
              ) : (
                <span className='no-card'>No saving cards</span>
              )}
            </div>

            <div className='list-cards-vertical'>
              {savingCards?.map((savingCard, index) => (
                <ListCardItem
                  key={savingCard?.id}
                  isCompleted={savingCard?.status === 'success'}
                  isActive={currentSavingCard?.id === savingCard?.id}
                  label={savingCard?.bank}
                  cardId={get4LastDigit(savingCard?.cardNumber)}
                  value={savingCard?.balance}
                  onClick={() => {
                    setCurrentSavingCard(savingCard);
                    ref.current = index;
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {showModal && modals[modal]}
    </div>
  );
};

export default memo(Cards);
