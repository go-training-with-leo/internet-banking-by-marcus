import { StorageKey } from 'utils/constants';

const saveAuthTokenToLocalStorage = (accessToken) =>
  localStorage.setItem(StorageKey.authAccessToken, accessToken);

const getAuthTokenFromLocalStorage = () =>
  localStorage.get(StorageKey.authAccessToken);

const removeAuthTokenFromLocalStorage = () =>
  localStorage.removeItem(StorageKey.authAccessToken);

const capitalizeFirstLetter = (text) => {
  return text && text[0].toUpperCase() + text.slice(1).toLowerCase();
};

const isNumber = (number) => {
  return /\d/.test(number);
};

const parseMoneyVnd = (value) => {
  return isNumber(value)
    ? Number(value)
      .toLocaleString('en-US', { style: 'currency', currency: 'VND' })
      .slice(1)
      .split(',')
      .join(' ')
    : 'Invalid type';
};

export {
  capitalizeFirstLetter,
  getAuthTokenFromLocalStorage,
  isNumber,
  parseMoneyVnd,
  removeAuthTokenFromLocalStorage,
  saveAuthTokenToLocalStorage,
};
