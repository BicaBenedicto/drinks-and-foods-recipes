import {
  fetchFirstLetter,
  fetchFirstLetterDrink,
  fetchIngrediente,
  fetchIngredienteDrink,
  fetchName,
  fetchNameDrink } from '../../services/fetchFood';

export const GET_EMAIL = 'GET_EMAIL';
export const SET_INGREDIENTE = 'SET_INGREDIENTE';

export const actionLogin = (payload) => ({ type: GET_EMAIL, payload });
export const setIngrediente = (payload) => ({ type: SET_INGREDIENTE, payload });

export const actionfetchIngrediente = (type) => (dispatch) => {
  fetchIngrediente(type).then((response) => dispatch(setIngrediente(response)));
};

export const actionfetchName = (type) => (dispatch) => {
  fetchName(type).then((response) => dispatch(setIngrediente(response)));
};

export const actionfetchFirstLetter = (type) => (dispatch) => {
  fetchFirstLetter(type).then((response) => dispatch(setIngrediente(response)));
};

export const actionfetchIngredienteDrink = (type) => (dispatch) => {
  fetchIngredienteDrink(type).then((response) => dispatch(setIngrediente(response)));
};

export const actionfetchNameDrink = (type) => (dispatch) => {
  fetchNameDrink(type).then((response) => dispatch(setIngrediente(response)));
};

export const actionfetchFirstLetterDrink = (type) => (dispatch) => {
  fetchFirstLetterDrink(type).then((response) => dispatch(setIngrediente(response)));
};
