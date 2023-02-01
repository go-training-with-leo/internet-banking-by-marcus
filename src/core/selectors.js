const selectAccount = (state) => state.account;
const selectAuth = (state) => state.auth;
const selectCard = (state) => state.card;
const selectContact = (state) => state.contact;
const selectDebt = (state) => state.debt;
const selectHistory = (state) => state.history;
const selectTransfer = (state) => state.transfer;

export {
  selectAccount,
  selectAuth,
  selectCard,
  selectContact,
  selectDebt,
  selectHistory,
  selectTransfer,
};
