import React, { useEffect } from 'react';

import Card from 'components/Card/Default';
import ListCardItem from 'components/ListCardItem';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'core/selectors';
import { getPayingCard } from 'global/redux/card/thunk';
import { divideSpaceIdCard } from 'utils/helpers';

const Cards = () => {
  const dispatch = useDispatch();

  const { payingCard } = useSelector((state) => state.card);
  const { currentUser } = useSelector(selectAuth);

  useEffect(() => {
    if (currentUser) dispatch(getPayingCard({ email: currentUser.email }));
  }, [currentUser]);

  return (
    <div className='cards-view'>
      <div className='paying-card'>
        <span className='paying-card__title'>Paying card</span>
        <Card
          expireTime='04 / 24'
          masterCard
          idCard={divideSpaceIdCard(payingCard?.cardNumber)}
        >
          {Number(payingCard?.balance)}
        </Card>
      </div>
      <div className='saving-card'>
        <div className='saving-card__container'>
          <span className='title'>Saving cards</span>
          <Card expireTime='04 / 24' visaCard idCard='5678 4889 2323 9091'>
            150000000
          </Card>
        </div>
        <div className='list-cards-vertical'>
          <ListCardItem
            isActive
            label='Mastercard'
            cardId='9091'
            value={150000000}
          />
          <ListCardItem label='Mastercard' cardId='9091' value={150000000} />
          <ListCardItem label='Mastercard' cardId='9091' value={150000000} />
          <ListCardItem label='Mastercard' cardId='9091' value={150000000} />
          <ListCardItem label='Mastercard' cardId='9091' value={150000000} />
          <ListCardItem label='Mastercard' cardId='9091' value={150000000} />
        </div>
      </div>
    </div>
  );
};

export default Cards;
