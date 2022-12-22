const accessToken = {
  set: (token) => localStorage.setItem('accessToken', token),
  get: () => localStorage.getItem('accessToken'),
  remove: () => localStorage.removeItem('accessToken'),
};

export { accessToken };
