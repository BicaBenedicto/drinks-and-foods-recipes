export const GET_EMAIL = 'GET_EMAIL';

export const actionLogin = (payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
  return ({ type: GET_EMAIL, payload });
};
