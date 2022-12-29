import React from 'react';

import SmallCardComponent from '.';

export default {
  title: 'Card',
  component: SmallCardComponent,
};

const SmallCard = () => (
  <SmallCardComponent isActive label='VISA'>
    9829
  </SmallCardComponent>
);

export { SmallCard };
