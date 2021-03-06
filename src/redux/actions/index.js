import {
  fetchFirstLetter,
  fetchIngrediente,
  fetchName,
  fetchCategory,
  fetchList,
  fetchID,
  fetchRandom,
  fetchIngredientsList,
  fetchFoodArea,
} from '../../services/fetchFood';

export const GET_EMAIL = 'GET_EMAIL';

export const SET_MEALS = 'SET_MEALS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_MEAL_OR_DRINK = 'SET_MEAL_OR_DRINK';

export const actionLogin = (payload) => ({ type: GET_EMAIL, payload });

export const actionMeals = (payload) => ({ type: SET_MEALS, payload });
export const actionCategories = (payload) => ({ type: SET_CATEGORIES, payload });

export const actionMealOrDrink = (payload) => ({ type: SET_MEAL_OR_DRINK, payload });

export const actionFetchIngrediente = (type, page) => (dispatch) => (
  fetchIngrediente(type, page)
    .then((response) => dispatch(actionMeals(response))));

export const actionFetchName = (type, page) => (dispatch) => (
  fetchName(type, page)
    .then((response) => {
      if (!response) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        dispatch(actionMeals(response));
      }
    }));

export const actionFetchFirstLetter = (type, page) => (dispatch) => (
  fetchFirstLetter(type, page)
    .then((response) => dispatch(actionMeals(response))));

export const actionFetchCategory = (type, page) => (dispatch) => (
  fetchCategory(type, page)
    .then((response) => dispatch(actionMeals(response)))
);

export const actionFetchList = (page) => (dispatch) => (
  fetchList(page)
    .then((response) => dispatch(actionCategories(response))));

export const actionFetchID = (type, page) => (dispatch) => (
  fetchID(type, page)
    .then((response) => dispatch(actionMealOrDrink(response)))
);

export const actionFetchRandom = (type) => (dispatch) => (
  fetchRandom(type)
    .then((response) => dispatch(actionMealOrDrink(response)))
);

export const actionFetchIngredientList = (type) => (dispatch) => (
  fetchIngredientsList(type)
    .then((response) => dispatch(actionMeals(response)))
);

export const actionFetchFoodArea = (type, search = '') => (dispatch) => (
  fetchFoodArea(type, search)
    .then((response) => {
      if (type === 'list') return dispatch(actionCategories(response));
      return dispatch(actionMeals(response));
    })
);
