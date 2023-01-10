const StorageKey = {
  authAccessToken: '@auth:accessToken',
  authRefreshToken: '@auth:refreshToken',
};

const ToastType = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
};

const mainPagesRole = {
  ADMIN: '/employees',
  EMPLOYEE: '/cards',
  CUSTOMER: '/customer/accounts',
};

export { StorageKey, ToastType, mainPagesRole };
