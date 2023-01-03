import React from 'react';

import ModalComponent from '.';

export default {
  title: 'Modal',
  component: ModalComponent,
};

const Modal = () => (
  <ModalComponent title='Title' cancel>
    <span>Children</span>
  </ModalComponent>
);

export { Modal };
