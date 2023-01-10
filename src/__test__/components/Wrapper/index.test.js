import React from 'react';
import { render } from '@testing-library/react';
import Wrapper from 'components/Wrapper';

describe('Wrapper', () => {
  it('Props valid', () => {
    const tree = render(
      <Wrapper title='Title' cancel>
        <span>Children</span>
      </Wrapper>
    );

    const wrapper = tree.container.querySelector('div.wrapper');
    expect(wrapper).toHaveTextContent('Children');
    expect(wrapper).toHaveTextContent('Title');

    expect(tree).toMatchSnapshot();
  });
});
