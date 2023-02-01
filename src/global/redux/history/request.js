import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'services/firebase';

const fetchRecHistory = async (cardNumber) => {
  const queryFireStore = query(
    collection(db, 'histories'),
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
    collection(db, 'histories'),
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

const fetchDebtHistory = async (cardNumber) => {
  const queryDebtor = query(
    collection(db, 'histories'),
    where('type', '==', 'DEBT'),
    where('from.cardNumber', '==', cardNumber),
    orderBy('createdAt', 'desc')
  );
  const queryLender = query(
    collection(db, 'histories'),
    where('type', '==', 'DEBT'),
    where('dest.cardNumber', '==', cardNumber),
    orderBy('createdAt', 'desc')
  );

  const [getDebtor, getLender] = await Promise.all([
    getDocs(queryDebtor),
    getDocs(queryLender),
  ]);
  const debtors = getDebtor.docs.map((debtor) => {
    return {
      ...debtor.data(),
      role: 'debt',
    };
  });
  const lenders = getLender.docs.map((lender) => {
    return {
      ...lender.data(),
      role: 'loan',
    };
  });

  const allDebts = [...debtors, ...lenders].sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  return allDebts;
};

export { fetchDebtHistory, fetchRecHistory, fetchTransfHistory };
