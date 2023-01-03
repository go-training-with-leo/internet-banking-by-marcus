import React from 'react';

import WrapperContainer from '.';

export default {
  title: 'Wrapper',
  component: WrapperContainer,
};

const Wrapper = () => (
  <WrapperContainer title='Title' cancel>
    <span>Children</span>
  </WrapperContainer>
);

export { Wrapper };
