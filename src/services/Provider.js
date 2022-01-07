import React, { useState } from 'react';
import Context from './Context';

export default function ProviderHook({ children }) {
  const [login, changeLogin] = useState({ email: '', password: '' });
  const [searchFood, setSearchFood] = useState({ value: '', type: 'nome' });
  const [meals, setMeals] = useState({});
  const [categories, setCategories] = useState({});
  const [item, setItem] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recipesInProgress, addRecipeInProgress] = useState({ cocktails: {}, meals: {} });
  const [actualIngredients, setActualIngredients] = useState([]);
  const [favorites, setFavorites] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));

  const STORE_CONTEXT = {
    login,
    changeLogin,
    searchFood,
    setSearchFood,
    meals,
    setMeals,
    categories,
    setCategories,
    item,
    setItem,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
    inProgressRecipes: {
      actualIngredients,
      setActualIngredients,
      recipesInProgress,
      addRecipeInProgress,
    },
    favoriteRecipes: {
      favorites,
      setFavorites,
    },
  };

  return (
    <Context.Provider value={ STORE_CONTEXT }>
      {children}
    </Context.Provider>
  );
}
