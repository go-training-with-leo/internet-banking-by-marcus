import React from 'react';

import './style.scss';
import { PlusIcon } from 'assets/images';

const Table = () => {
  const data = [
    { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
    { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
    { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
    { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' },
  ];
  const titles = Object.keys(data[0]);
  const renderHeader = titles.map((title) => <th key={title}>{title}</th>);
  const renderData = data.map((item) => {
    return (
      <tr key={item?.id}>
        {titles.map((title) => (
          <td key={title}>{item[title]}</td>
        ))}
        <td>
          <PlusIcon onClick={() => console.warn('fd')} />
          <PlusIcon />
        </td>
      </tr>
    );
  });

  return (
    <table>
      <tbody>
        <tr>{renderHeader}</tr>
        {renderData}
      </tbody>
    </table>
  );
};

export default Table;
