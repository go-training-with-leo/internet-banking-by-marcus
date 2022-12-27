import { StorageKey } from 'utils/constants';

const saveLocalStorage = (
  props,
  { type = 'setItem' | 'getItem' | 'removeItem' }
) => localStorage[type](props.key, props.value);

const saveLoginToken = (accessToken) =>
  localStorage.setItem(StorageKey.authAccessToken, accessToken);

const getLoginToken = () => localStorage.get(StorageKey.authAccessToken);

const removeLoginToken = () =>
  localStorage.removeItem(StorageKey.authAccessToken);

export { saveLoginToken, getLoginToken, removeLoginToken, saveLocalStorage };
