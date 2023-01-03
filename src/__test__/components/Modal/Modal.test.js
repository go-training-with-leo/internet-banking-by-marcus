import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Modal from 'components/Modal';
import { act } from 'react-dom/test-utils';

describe('Modal', () => {
  it('Props valid', () => {
    const tree = render(
      <Modal title='Title' cancel>
        <span>Children</span>
      </Modal>
    );

    const modal = tree.container.querySelector('div.modal-container');
    const header = tree.container.querySelector('div.modal-header');
    expect(modal).toHaveTextContent('Children');
    expect(modal).toHaveTextContent('Title');

    expect(header.lastChild).toHaveClass('cancel');

    expect(tree).toMatchSnapshot();
  });

  it('Props isClose', () => {
    const tree = render(
      <Modal title='Title' cancel isClose>
        <span>Children</span>
      </Modal>
    );

    const modal = tree.container.querySelector('div.modal-container');

    expect(modal).toHaveClass('closeModal');

    expect(tree).toMatchSnapshot();
  });
  it('Close click cancel', async () => {
    const tree = render(
      <Modal title='Title' cancel>
        <span>Children</span>
      </Modal>
    );

    const modal = tree.container.querySelector('div.modal-container');
    const cancelButton = tree.container.querySelector('div.cancel');

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    console.warn(modal.className);
    expect(modal).toBeInTheDocument();

    expect(tree).toMatchSnapshot();
  });
});
