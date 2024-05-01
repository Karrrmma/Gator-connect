export const isUserLogged = () => {
    const token = sessionStorage.getItem('token');
    return token !== null && token !== undefined;
};