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

export { saveLoginToken, getLoginToken, removeLoginToken, saveLocalStorage };
