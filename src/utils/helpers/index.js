import { StorageKey } from 'utils/constants';

const saveLoginToken = (accessToken) =>
  localStorage.setItem(StorageKey.authAccessToken, accessToken);

const getLoginToken = () => localStorage.get(StorageKey.authAccessToken);

const removeLoginToken = () =>
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
  saveLoginToken,
  getLoginToken,
  removeLoginToken,
  capitalFirstLetter,
  isNumber,
  parseMoneyVnd,
};
