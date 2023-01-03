import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import SmallCard from 'components/Card/Small';
import { Back, Next } from 'assets/images';

import './style.scss';

const ListCardsHorizontal = ({ listItem }) => {
  const itemRef = useRef(null);
  const [startPosition, setStartPosition] = useState(0);

  const scrollToItem = () => {
    itemRef?.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

  const handleNext = () => {
    if (startPosition + 3 !== listItem.length) {
      setStartPosition((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (startPosition !== 0) {
      setStartPosition((prev) => prev - 1);
    }
  };

  useEffect(() => {
    scrollToItem();
  }, [startPosition]);

  return (
    <div className='horizontal'>
      {listItem.length === 0 ? (
        <span className='empty'>No cards found</span>
      ) : (
        <>
          <Back
            className='btn-back'
            width={30}
            height={30}
            fill='#7C7F87'
            onClick={handleBack}
          />
          <div className='list-container'>
            {listItem.map((item, index) => {
              return (
                <div
                  ref={startPosition === index ? itemRef : null}
                  key={item?.id}
                >
                  <SmallCard label={item?.label}>{item?.value}</SmallCard>
                </div>
              );
            })}
          </div>
          <Next
            className='btn-next'
            width={30}
            height={30}
            fill='#7C7F87'
            onClick={handleNext}
          />
        </>
      )}
    </div>
  );
};

ListCardsHorizontal.defaultProps = {
  listItem: undefined,
};

ListCardsHorizontal.propTypes = {
  listItem: PropTypes.array,
};

export default ListCardsHorizontal;
