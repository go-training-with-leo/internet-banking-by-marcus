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
  CUSTOMER: '/customer/accounts',
  EMPLOYEE: '/employee/accounts',
};

export { StorageKey, ToastType, mainPagesRole };
