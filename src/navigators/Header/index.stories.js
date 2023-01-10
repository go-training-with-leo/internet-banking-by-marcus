import React from 'react';

import Header from '.';

export default {
  title: 'Page Header',
  component: Header,
};

const Default = () => (
  <Header type='free' title='Title'>
    <button>Add account</button>
  </Header>
);

export { Default };
