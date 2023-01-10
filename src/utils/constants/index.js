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
  EMPLOYEE: '/accounts',
  CUSTOMER: '/cards',
};

export { StorageKey, ToastType, mainPagesRole };
