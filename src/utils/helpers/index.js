import { StorageKey } from 'utils/constants';

const saveLocalStorage = ({
  type = 'setItem' | 'getItem' | 'removeItem',
  key,
  value,
}) => localStorage[type](key, value);

const saveLoginToken = (accessToken) =>
  localStorage.setItem(StorageKey.authAccessToken, accessToken);

const getLoginToken = () => localStorage.get(StorageKey.authAccessToken);

const removeLoginToken = () =>
  localStorage.removeItem(StorageKey.authAccessToken);

const capitalFirstLetter = (text) => {
  return text && text[0].toUpperCase() + text.slice(1).toLowerCase();
};

const isNumber = (number) => {
  return /\d/.test(number) ? number : 'Invalid type';
};

export {
  saveLoginToken,
  getLoginToken,
  removeLoginToken,
  saveLocalStorage,
  capitalFirstLetter,
  isNumber,
};
