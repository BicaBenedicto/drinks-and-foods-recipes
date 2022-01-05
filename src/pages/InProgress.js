import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/in-progress.css';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

function loadLocalStorage(setSavedRecipe) {
  if (localStorage.inProgressRecipes) {
    const localJson = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setSavedRecipe(localJson);
  }
}

function handleClick({ target }, items, newItems) {
  const { data, foodType } = items;
  const { savedRecipe, recipe, idRecipe, setSavedRecipe } = newItems;
  if (target.checked) {
    target.parentNode.className = 'riscado';
    if (!savedRecipe[recipe][data[foodType][0][idRecipe]]) {
      setSavedRecipe({
        ...savedRecipe,
        [recipe]: { [data[foodType][0][idRecipe]]: [target.name] },
      });
    } else {
      setSavedRecipe({
        ...savedRecipe,
        [recipe]: { [data[foodType][0][idRecipe]]: [
          ...savedRecipe[recipe][data[foodType][0][idRecipe]],
          target.name] },
      });
    }
  } else {
    target.parentNode.className = '';
    setSavedRecipe({
      ...savedRecipe,
      [recipe]: { [data[foodType][0][idRecipe]]: [
        ...savedRecipe[recipe][data[foodType][0][idRecipe]]
          .filter((value) => value !== target.name)] },
    });
  }
}

function setLocalStorage(items, idRecipe, type) {
  const { data, foodType } = items;
  const saveLocal = {
    id: idRecipe,
    type,
    area: data[foodType][0].strArea || '',
    category: data[foodType][0].strCategory || '',
    alcoholicOrNot: data[foodType][0].strAlcoholic || '',
    name: data[foodType][0].strMeal || data[foodType][0].strDrink,
    image: data[foodType][0].strMealThumb || data[foodType][0].strDrinkThumb,
    doneDate: new Date().toLocaleDateString('PT-BR'),
    tags: [data[foodType][0].strTags] || [],
  };
  if (!localStorage.doneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify([saveLocal]));
  } else {
    const localGet = JSON.parse(localStorage.getItem('doneRecipes'));
    localGet.push(saveLocal);
    localStorage.setItem('doneRecipes', JSON.stringify(localGet));
  }
}

export default function FoodsInProgress() {
  const [data, setData] = useState({});
  const idReceita = window.location.pathname.split('/')[2];
  const [savedRecipe, setSavedRecipe] = useState({
    cocktails: {},
    meals: {},
  });
  const [checkIngredients, setCheckIngredients] = useState(null);
  let foodType = 'meals';
  let recipe = 'meals';
  let type = 'comidas';
  let idRecipe = 'idMeal';

  if (window.location.pathname.split('/')[1] === 'bebidas') {
    foodType = 'drinks';
    recipe = 'cocktails';
    type = 'bebidas';
    idRecipe = 'idDrink';
  }

  const fetchComidas = (endPointFetch, setState) => {
    fetch(endPointFetch)
      .then((resolve) => resolve.json())
      .then((response) => setState(response));
  };

  // componentDidMount
  useEffect(() => {
    loadLocalStorage(setSavedRecipe);
  }, []);

  // componentDidUpdate
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipe));
  }, [savedRecipe]);

  useEffect(() => {
    const page = window.location.pathname.split('/')[1];
    if (page === 'comidas') {
      fetchComidas(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`, setData);
    } else {
      fetchComidas(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`, setData);
    }
  }, [idReceita]);

  if (!data[foodType]) {
    return (<p>Carregando</p>);
  }

  let food;
  let strType;

  if (data.meals) {
    [food] = data[foodType];
    strType = 'strMeal';
  } else {
    [food] = data.drinks;
    strType = 'strDrink';
  }

  const ingredients = Object.keys(food).filter((value) => value.includes('strIngredient'))
    .filter((ingredient) => food[ingredient]);

  const items = { idReceita, type, data, foodType };
  const newItems = { savedRecipe, recipe, idRecipe, setSavedRecipe };
  const verifyrecipe = savedRecipe[recipe][data[foodType][0][idRecipe]] || false;
  if (!checkIngredients) {
    ingredients.forEach((ingredient) => {
      setCheckIngredients({ ...checkIngredients, [food[ingredient]]: false });
    });
  }

  return (
    <div>
      <div className="in-progress-card">
        <h3 data-testid="recipe-title">
          { food[strType] }
        </h3>
        <img
          src={ food[`${strType}Thumb`] }
          alt={ food[strType] }
          data-testid="recipe-photo"
        />
        <h4
          data-testid="recipe-category"
        >
          { strType === 'strMeal' ? 'Comida' : 'Bebida' }
        </h4>
        <ul>
          { ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-step` }>
              <label
                htmlFor={ food[ingredient] }
                className={ verifyrecipe
                  && savedRecipe[recipe][data[foodType][0][idRecipe]]
                    .includes(food[ingredient]) ? 'riscado' : '' }
              >
                <input
                  type="checkbox"
                  id={ food[ingredient] }
                  name={ food[ingredient] }
                  onClick={ (event) => handleClick(event, items, newItems) }
                  defaultChecked={ verifyrecipe
                    && savedRecipe[recipe][data[foodType][0][idRecipe]]
                      .includes(food[ingredient]) }
                />
                { food[ingredient] }
              </label>
            </li>
          )) }
        </ul>
        <p data-testid="instructions">
          { food.strInstructions }
        </p>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ ingredients.length !== verifyrecipe.length }
            onClick={ () => setLocalStorage(items, idRecipe, type) }
          >
            Finalizar Receita
          </button>
        </Link>
        <ShareButton />
        <FavoriteButton items={ items } />
      </div>
    </div>
  );
}
