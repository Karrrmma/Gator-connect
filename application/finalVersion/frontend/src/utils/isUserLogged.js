// decides if the user is logged in or not by checking the token in the local storage
export const isUserLogged = () => {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
};
