import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'services/firebase';

const fetchRecHistory = async (cardNumber) => {
  const queryFireStore = query(
    collection(db, 'transfer'),
    where('type', '==', 'TRANSFER'),
    where('dest.cardNumber', '==', cardNumber),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(queryFireStore);
  const recHistories = querySnapshot.docs.map((document) => {
    return document.data();
  });
  return recHistories;
};

const fetchTransfHistory = async (cardNumber) => {
  const queryFireStore = query(
    collection(db, 'transfer'),
    where('type', '==', 'TRANSFER'),
    where('from.cardNumber', '==', cardNumber),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(queryFireStore);
  const transfHistories = querySnapshot.docs.map((document) => {
    return document.data();
  });
  return transfHistories;
};

export { fetchRecHistory, fetchTransfHistory };
