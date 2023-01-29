import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'components/Card/Default';
import ListCardItem from 'components/ListCardItem';
import Loader from 'components/Loader';
import { selectAuth, selectCard } from 'core/selectors';
import { getCards } from 'global/redux/card/thunk';
import { divideSpaceIdCard, get4LastDigit } from 'utils/helpers';

import './style.scss';

const Cards = () => {
  const dispatch = useDispatch();

  const [currentSavingCard, setCurrentSavingCard] = useState({});

  const {
    payingCard,
    savingCards,
    isLoading: loading,
  } = useSelector((state) => state.card);
  const { currentUser } = useSelector(selectAuth);
  const { isFetched } = useSelector(selectCard);

  useEffect(() => {
    if (currentUser && !isFetched) {
      dispatch(getCards({ email: currentUser.email }));
    }
  }, [currentUser]);

  useEffect(() => {
    setCurrentSavingCard(savingCards[0]);
  }, [savingCards]);

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
                <Card
                  isLoading={loading}
                  expireTime='04 / 24'
                  visaCard={currentSavingCard?.bank?.toLowerCase() === 'visa'}
                  masterCard={
                    currentSavingCard?.bank?.toLowerCase() === 'mastercard'
                  }
                  napasCard={currentSavingCard?.bank?.toLowerCase() === 'napas'}
                  idCard={divideSpaceIdCard(currentSavingCard?.cardNumber)}
                >
                  {currentSavingCard?.balance}
                </Card>
              ) : (
                <span className='no-card'>No saving cards</span>
              )}
            </div>
            <div className='list-cards-vertical'>
              {savingCards.map((savingCard) => (
                <ListCardItem
                  key={savingCard?.id}
                  isActive={currentSavingCard?.id === savingCard?.id}
                  label={savingCard?.bank}
                  cardId={get4LastDigit(savingCard?.cardNumber)}
                  value={savingCard?.balance}
                  onClick={() => {
                    setCurrentSavingCard(savingCard);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Cards);
