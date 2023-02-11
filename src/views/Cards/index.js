import classNames from 'classnames';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import Card from 'components/Card/Default';
import Loader from 'components/Loader';
import IconButton from 'components/Button/Icon';
import { db } from 'services/firebase';
import { selectAccount, selectAuth, selectCard } from 'core/selectors';
import { getCards } from 'global/redux/card/thunk';
import { divideSpaceIdCard } from 'utils/helpers';
import { getCustAccount } from 'global/redux/account/thunk';
import { updateSavingCard } from 'global/redux/card/slice';
import { Back, Next, PlusIcon } from 'assets/images';

import useToggle from 'components/hooks/useToggle';
import DetailModal from './DetailModal';
import DepositModal from './DepositModal';

import './style.scss';
import NewSvCard from './NewSvCard';

const CARD_DEPOSIT = 'CARD_DEPOSIT';
const ADD_DEPOSIT = 'ADD_DEPOSIT';

const Cards = () => {
  const dispatch = useDispatch();
  const ref = useRef(0);
  const itemRef = useRef(null);

  const {
    payingCard,
    savingCards,
    isLoading: loading,
  } = useSelector((state) => state.card);
  const { currentUser } = useSelector(selectAuth);
  const { isFetched, isDeleteSavingCardLoading: isDeleteLoading } =
    useSelector(selectCard);
  const { isFetched: isAccountsFetched } = useSelector(selectAccount);

  const [startPosition, setStartPosition] = useState(0);

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
    ADD_DEPOSIT: <NewSvCard setToggle={setShowModal} />,
  };

  const scrollToItem = () => {
    itemRef?.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

  const handleNext = () => {
    if (startPosition + 4 < savingCards.length) {
      setStartPosition(startPosition + 1);
    }
  };

  const handleBack = () => {
    if (startPosition !== 0) {
      setStartPosition(startPosition - 1);
    }
  };

  const handleAddSavingCard = () => {
    setModal(ADD_DEPOSIT);
    setShowModal();
  };

  const handleShowDeposit = () => {
    setShowModal();
    setModal(CARD_DEPOSIT);
  };

  useEffect(() => {
    scrollToItem();
  }, [startPosition]);

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
        <div className='paying-card__detail'>
          <Card
            isLoading={loading}
            expireTime='04 / 24'
            masterCard
            idCard={divideSpaceIdCard(payingCard?.cardNumber)}
          >
            {Number(payingCard?.balance)}
          </Card>
        </div>
      </div>
      <div className='saving-card'>
        {loading ? (
          <Loader large />
        ) : (
          <div className='saving-card__container'>
            <span className='title'>Saving cards</span>
            <div className='add-btn'>
              <IconButton danger onClick={handleAddSavingCard}>
                New saving card
                <PlusIcon width={15} height={15} fill='white' />
              </IconButton>
            </div>
            {savingCards.length > 0 ? (
              <div className='saving-card-list'>
                <Back
                  className='nav-button'
                  width={30}
                  height={30}
                  color='white'
                  onClick={handleBack}
                />
                <div className='saving-card-list-horizontal'>
                  {savingCards?.map((savingCard, index) => (
                    <div
                      {...(startPosition === index && { ref: itemRef })}
                      key={savingCard?.id}
                      role='listitem'
                      onClick={() => setCurrentSavingCard(savingCard)}
                      className={classNames(
                        'saving-card-list-horizontal__detail',
                        { isSelected: savingCard?.id === currentSavingCard?.id }
                      )}
                    >
                      <Card
                        depositClick={handleShowDeposit}
                        isCompleted={savingCard?.status === 'success'}
                        isActive={currentSavingCard?.id === savingCard?.id}
                        isLoading={loading}
                        expireTime='04 / 24'
                        visaCard={savingCard?.bank?.toLowerCase() === 'visa'}
                        masterCard={
                          savingCard?.bank?.toLowerCase() === 'mastercard'
                        }
                        napasCard={savingCard?.bank?.toLowerCase() === 'napas'}
                        idCard={divideSpaceIdCard(savingCard?.cardNumber)}
                      >
                        {savingCard?.balance}
                      </Card>
                    </div>
                  ))}
                </div>
                <Next
                  className='nav-button'
                  width={30}
                  height={30}
                  fill='white'
                  onClick={handleNext}
                />
              </div>
            ) : (
              <span className='no-card'>No saving cards</span>
            )}
          </div>
        )}
      </div>
      {showModal && modals[modal]}
    </div>
  );
};

export default memo(Cards);
