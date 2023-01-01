import React from 'react';

import StepperComponent from '.';

export default {
  title: 'Stepper',
  component: StepperComponent,
};

const Stepper = () => (
  <StepperComponent step={1} title='Card'>
    Please pick a card to proceed this payment
  </StepperComponent>
);

export { Stepper };
