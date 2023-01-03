import React from 'react';

import SmallCardComponent from '.';

export default {
  title: 'Card',
  component: SmallCardComponent,
};

const SmallCard = () => (
  <SmallCardComponent label='VISA'>090031</SmallCardComponent>
);

const SmallCardActive = () => (
  <SmallCardComponent isActive label='VISA'>
    090031
  </SmallCardComponent>
);

export { SmallCard, SmallCardActive };
