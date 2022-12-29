import React from 'react';

import Card from '.';

export default {
  title: 'Card',
  component: Card,
};

const DefaultCard = () => {
  return (
    <Card expireTime='04 / 24' idCard='5678 4889 2323 9091' napasCard>
      150000000
    </Card>
  );
};

export { DefaultCard };
