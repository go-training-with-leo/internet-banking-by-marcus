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

const preProcessMoney = (number) => {
  return isNumber(number)
    ? Number(number)
      .toLocaleString('en-US', { style: 'currency', currency: 'VND' })
      .slice(1)
      .split(',')
      .join(' ')
    : 'Invalid type';
};

export {
  saveAuthTokenToLocalStorage,
  getAuthTokenToLocalStorage,
  removeAuthTokenToLocalStorage,
  capitalFirstLetter,
  isNumber,
  preProcessMoney,
};
