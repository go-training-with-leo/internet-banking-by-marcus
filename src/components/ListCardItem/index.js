import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import SmallCard from 'components/Card/Small';
import { Ellipse } from 'assets/images';
import { parseMoneyVnd } from 'utils/helpers';

import './style.scss';

const ListCardItem = ({
  isActive,
  isCompleted,
  label,
  cardId,
  value,
  onClick,
}) => {
  return (
    <div className='list-card-item' onClick={onClick} role='listitem'>
      <Ellipse className={classNames({ hide: !isActive })} />
      <SmallCard isActive={isCompleted} label={label}>
        {cardId}
      </SmallCard>
      <span className='value'>{parseMoneyVnd(value)} VND</span>
    </div>
  );
};

ListCardItem.defaultProps = {
  isActive: false,
  onClick: () => {},
  isCompleted: false,
};

ListCardItem.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func,
};

export default ListCardItem;
