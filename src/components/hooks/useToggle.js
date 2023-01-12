import { useReducer } from 'react';

const toggler = (currentValue, newValue) => {
  return typeof newValue === 'boolean' ? newValue : !currentValue;
};

const useToggle = (initialValue = false) => {
  return useReducer(toggler, initialValue);
};

export default useToggle;
