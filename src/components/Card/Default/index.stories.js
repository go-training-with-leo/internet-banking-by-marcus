import React from 'react';

import Card from '.';

export default {
  title: 'Card',
  component: Card,
};

const LoadingCard = () => {
  return <Card isLoading />;
};

const MasterCard = () => {
  return (
    <Card expireTime='04/24' idCard='5678 4889 2323 9091' masterCard>
      15000000
    </Card>
  );
};

const VisaCard = () => {
  return (
    <Card expireTime='04/24' idCard='5678 4889 2323 9091' visaCard>
      15000000
    </Card>
  );
};

const NapasCard = () => {
  return (
    <Card expireTime='04/24' idCard='5678 4889 2323 9091' napasCard>
      15000000
    </Card>
  );
};

export { LoadingCard, MasterCard, VisaCard, NapasCard };
