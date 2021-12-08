export const GET_EMAIL = 'GET_EMAIL';

export const actionLogin = (payload) => {
<<<<<<< HEAD
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
=======
>>>>>>> main-group-22
  localStorage.setItem('user', JSON.stringify(payload));
  return ({ type: GET_EMAIL, payload });
};
