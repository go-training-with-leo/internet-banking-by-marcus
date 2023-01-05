import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';

import TextArea from 'components/TextArea';

describe('Text Area', () => {
  describe('Test with input & props', () => {
    const registerFunction = jest.fn();
    it('Valid props', async () => {
      const tree = render(
        <TextArea
          name='textAreaInput'
          label='Label'
          register={registerFunction}
        />
      );

      const textArea = tree.container.querySelector('textarea');

      await act(async () => {
        fireEvent.change(textArea, {
          target: { value: 'Text Area test string' },
        });
      });

      expect(textArea.value).toMatch('Text Area test string');

      expect(textArea).toHaveAttribute('id', 'text-area-textAreaInput');

      expect(tree).toMatchSnapshot();
    });

    test('Wrong props', () => {
      const tree = render(
        <TextArea
          rows={3}
          cols={2}
          name='textAreaInput'
          label='Label'
          register={registerFunction}
        />
      );

      const textArea = tree.container.querySelector('textarea');

      expect(textArea).not.toHaveAttribute('rows');
      expect(textArea).not.toHaveAttribute('cols');

      expect(tree).toMatchSnapshot();
    });
  });
});
