import { StorageKey } from 'utils/constants';

const saveAuthTokenToLocalStorage = (accessToken) =>
  localStorage.setItem(StorageKey.authAccessToken, accessToken);

const getAuthTokenToLocalStorage = () =>
  localStorage.get(StorageKey.authAccessToken);

const removeAuthTokenToLocalStorage = () =>
  localStorage.removeItem(StorageKey.authAccessToken);

const capitalFirstLetter = (text) => {
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
  capitalFirstLetter,
  getAuthTokenToLocalStorage,
  isNumber,
  parseMoneyVnd,
  removeAuthTokenToLocalStorage,
  saveAuthTokenToLocalStorage,
};
