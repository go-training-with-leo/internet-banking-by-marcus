import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from 'services/firebase';
import { mainPagesRole, StorageKey } from 'utils/constants';

const modifyLocalStorage = (key, value) => localStorage.setItem(key, value);

const getLocalStorage = (key) => localStorage.getItem(key);

const removeLocalStorage = (key) => localStorage.removeItem(key);

const saveAuthTokenToLocalStorage = (accessToken) =>
  localStorage.setItem(StorageKey.authAccessToken, accessToken);

const getAuthTokenFromLocalStorage = () =>
  localStorage.get(StorageKey.authAccessToken);

const removeAuthTokenFromLocalStorage = () =>
  localStorage.removeItem(StorageKey.authAccessToken);

const capitalizeFirstLetter = (text) => {
  return text && `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;
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

const divideSpaceIdCard = (idCard) => {
  return idCard ? idCard.replace(/(\d{4}(?!\s))/g, '$1 ') : idCard;
};

const get4LastDigit = (idCard) => {
  const len = idCard.length;
  return idCard ? idCard.slice(len - 4) : idCard;
};

const getDocFireStore = async ({ path, id }) => {
  const docRef = doc(db, path, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

const queryDocs = async ({ path, field, value }) => {
  const queryFireStore = query(collection(db, path), where(field, '==', value));

  const querySnapshot = await getDocs(queryFireStore);

  const respone = querySnapshot.docs.map((document) => {
    return document.data();
  });
  return respone.length === 1 ? respone[0] : respone;
};

const getAllDocsInColl = async (collect) => {
  const querySnapshot = await getDocs(collection(db, collect));

  const allDocs = querySnapshot.docs.map((document) => document.data());
  return allDocs;
};

const getMainPageByRole = (role) => {
  return mainPagesRole[role] || null;
};

export {
  capitalizeFirstLetter,
  divideSpaceIdCard,
  get4LastDigit,
  getAllDocsInColl,
  getAuthTokenFromLocalStorage,
  getDocFireStore,
  getLocalStorage,
  getMainPageByRole,
  isNumber,
  modifyLocalStorage,
  parseMoneyVnd,
  queryDocs,
  removeAuthTokenFromLocalStorage,
  removeLocalStorage,
  saveAuthTokenToLocalStorage,
};
