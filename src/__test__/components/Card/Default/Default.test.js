import React from 'react';
import { render } from '@testing-library/react';

import DefaultCard from 'components/Card/Default';

describe('Default Card', () => {
  it('Test loading card', () => {
    const tree = render(<DefaultCard isLoading>1500000</DefaultCard>);

    const card = tree.container.querySelector('div.card');
    expect(card.firstChild).toHaveClass('loader');
    expect(tree).toMatchSnapshot();
  });

  it('Test valid props & napasCard', () => {
    const tree = render(
      <DefaultCard napasCard idCard='3212'>
        1500000
      </DefaultCard>
    );

    const card = tree.container.querySelector('div.card');
    const infor = tree.container.querySelector('div.card-info');
    const napasCard = tree.getByTestId('napas-card');

    expect(card).toHaveTextContent('1 500 000 VND');
    expect(card).toHaveTextContent('3212');
    expect(infor.lastChild).toContainElement(napasCard);
    expect(tree).toMatchSnapshot();
  });

  it('Test visaCard props', () => {
    const tree = render(
      <DefaultCard masterCard idCard='3212'>
        1500000
      </DefaultCard>
    );

    const card = tree.container.querySelector('div.card');
    const infor = tree.container.querySelector('div.card-info');
    const masterCard = tree.getByTestId('master-card');

    expect(card).toHaveTextContent('1 500 000 VND');
    expect(card).toHaveTextContent('3212');
    expect(infor.lastChild).toContainElement(masterCard);
    expect(tree).toMatchSnapshot();
  });

  it('Test visaCard props', () => {
    const tree = render(
      <DefaultCard visaCard idCard='3212'>
        1500000
      </DefaultCard>
    );

    const card = tree.container.querySelector('div.card');
    const infor = tree.container.querySelector('div.card-info');
    const visaCard = tree.getByTestId('visa-card');

    expect(card).toHaveTextContent('1 500 000 VND');
    expect(card).toHaveTextContent('3212');
    expect(infor.lastChild).toContainElement(visaCard);
    expect(tree).toMatchSnapshot();
  });

  test('Test card order', () => {
    const tree = render(
      <DefaultCard visaCard masterCard napasCard idCard='3212'>
        1500000
      </DefaultCard>
    );

    const card = tree.container.querySelector('div.card');
    const masterCard = tree.getByTestId('master-card');

    expect(masterCard).toBeInTheDocument();
    expect(card).not.toContainElement(tree.queryByTestId('napas-card'));
    expect(card).not.toContainElement(tree.queryByTestId('visa-card'));
    expect(tree).toMatchSnapshot();
  });
});
