export const isUserLogged = () => {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
};
