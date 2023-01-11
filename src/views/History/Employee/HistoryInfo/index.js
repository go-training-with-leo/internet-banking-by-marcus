import React from 'react';
import { useParams } from 'react-router-dom';

const HistoryInfo = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default HistoryInfo;
