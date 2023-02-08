import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import moment from 'moment';

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
    : '';
};

const removeNonNumeric = (num) => num?.toString().replace(/[^0-9]/g, '');

const divideSpaceIdCard = (idCard) => {
  return idCard ? idCard.replace(/(\d{4}(?!\s))/g, '$1 ') : idCard;
};

const get4LastDigit = (idCard) => {
  const len = idCard?.length;
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

const deleteDocFireStore = async ({ collect, id }) => {
  await deleteDoc(doc(db, collect, id));
};

const queryDocs = async ({ path, field, value }) => {
  const queryFireStore = query(collection(db, path), where(field, '==', value));

  const querySnapshot = await getDocs(queryFireStore);

  const respone = querySnapshot.docs.map((document) => {
    return document.data();
  });
  return respone;
};

const queryOrderDocs = async ({ path, field, value, orderField }) => {
  const queryFireStore = query(
    collection(db, path),
    where(field, '==', value),
    orderBy(orderField, 'desc')
  );

  const querySnapshot = await getDocs(queryFireStore);

  const respone = querySnapshot.docs.map((document) => {
    return document.data();
  });
  return respone;
};

const setDocFirestore = async ({ collect, id, data }) => {
  await setDoc(doc(db, collect, id), data);
};

const updateDocFireStore = async ({ collect, id, value }) => {
  const docRef = doc(db, collect, id);

  await updateDoc(docRef, {
    ...value,
    updateAt: serverTimestamp(),
  });
};

const getAllDocsInColl = async (collect) => {
  const querySnapshot = await getDocs(collection(db, collect));

  const allDocs = querySnapshot.docs.map((document) => document.data());
  return allDocs;
};

const convertTimestamp = (timestamp) => {
  return moment(timestamp).format('HH:mm DD/MM/YYYY');
};

const convertDatetamp = (timestamp) => {
  return moment(timestamp).format('DD/MM/YYYY');
};

const formatPhoneVN = (phoneNumber) => {
  if (!phoneNumber) {
    return null;
  }
  return `+84${phoneNumber.slice(1, phoneNumber.length)}`;
};

const getMainPageByRole = (role) => {
  return mainPagesRole[role] || null;
};

const compareDate = ({ currentDate, destDate }) => {
  const currentTimeInSec = new Date(currentDate) / 1000;
  const destTimeInSec = new Date(destDate) / 1000;
  return currentTimeInSec >= destTimeInSec;
};

export {
  capitalizeFirstLetter,
  compareDate,
  convertDatetamp,
  convertTimestamp,
  deleteDocFireStore,
  divideSpaceIdCard,
  formatPhoneVN,
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
  queryOrderDocs,
  removeAuthTokenFromLocalStorage,
  removeLocalStorage,
  removeNonNumeric,
  saveAuthTokenToLocalStorage,
  setDocFirestore,
  updateDocFireStore,
};
