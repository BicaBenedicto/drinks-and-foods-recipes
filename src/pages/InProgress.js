import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/in-progress.css';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import Context from '../services/Context';
import { actionFetchID } from '../redux/actions';

function loadLocalStorage(setSavedRecipe) {
  if (localStorage.inProgressRecipes) {
    const localJson = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setSavedRecipe(localJson);
  }
}

function handleClick({ target }, items, newItems) {
  const { food } = items;
  const { savedRecipe, recipe, idRecipe, setSavedRecipe } = newItems;
  if (target.checked) {
    target.parentNode.className = 'riscado';
    if (!savedRecipe[recipe][food[idRecipe]]) {
      setSavedRecipe({
        ...savedRecipe,
        [recipe]: { [food[idRecipe]]: [target.name] },
      });
    } else {
      setSavedRecipe({
        ...savedRecipe,
        [recipe]: { [food[idRecipe]]: [
          ...savedRecipe[recipe][food[idRecipe]],
          target.name] },
      });
    }
  } else {
    target.parentNode.className = '';
    setSavedRecipe({
      ...savedRecipe,
      [recipe]: { [food[idRecipe]]: [
        ...savedRecipe[recipe][food[idRecipe]]
          .filter((value) => value !== target.name)] },
    });
  }
}

function setLocalStorage(items, idRecipe, type) {
  const { food } = items;
  const saveLocal = {
    id: food.idMeal || food.idDrink,
    type: type.replace('s', ''),
    area: food.strArea || '',
    category: food.strCategory || '',
    alcoholicOrNot: food.strAlcoholic || '',
    name: food.strMeal || food.strDrink,
    image: food.strMealThumb || food.strDrinkThumb,
    doneDate: new Date().toLocaleDateString('PT-BR'),
    tags: [food.strTags] || [],
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
  const disp = useDispatch();
  const { pathname } = useLocation();
  const [, page, idReceita] = pathname.split('/');
  const { setItem } = useContext(Context);
  const [savedRecipe, setSavedRecipe] = useState({
    cocktails: {},
    meals: {},
  });

  const data = useSelector((s) => s.meal.item);

  const [checkIngredients, setCheckIngredients] = useState(null);
  const TYPE = (page === 'bebidas');
  const foodOrDrinkTypes = {
    foodType: TYPE ? 'drinks' : 'meals',
    recipe: TYPE ? 'cocktails' : 'meals',
    type: TYPE ? 'bebidas' : 'comidas',
    idRecipe: TYPE ? 'idDrink' : 'idMeal',
    strType: TYPE ? 'strDrink' : 'strMeal',
  };

  const { foodType, recipe, type, idRecipe, strType } = foodOrDrinkTypes;

  // componentDidMount
  useEffect(() => {
    loadLocalStorage(setSavedRecipe);
    disp(actionFetchID(idReceita, page));
  }, []);

  // componentDidUpdate
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipe));
  }, [savedRecipe]);

  if (!data[0]) {
    return (<p>Carregando</p>);
  }
  const [food] = data;
  setItem(food);

  const ingredients = Object.keys(food).filter((value) => value.includes('strIngredient'))
    .filter((ingredient) => food[ingredient]);

  const items = { idReceita, type, food, foodType };
  const newItems = { savedRecipe, recipe, idRecipe, setSavedRecipe };
  const verifyrecipe = savedRecipe[recipe][food[idRecipe]] || false;
  if (!checkIngredients) {
    ingredients.forEach((ingredient) => {
      setCheckIngredients({ ...checkIngredients, [food[ingredient]]: false });
    });
  }

  return (
    <div className="details-page">
      <ShareButton />
      <FavoriteButton />
      <img
        src={ food[`${strType}Thumb`] }
        alt={ food[strType] }
        data-testid="recipe-photo"
        className="recipe-image-progress"
      />
      <h3
        className="recipe-title"
        data-testid="recipe-title"
      >
        { food[strType] }
      </h3>
      <ul className="ingredients-list lista-checkbox">
        <h4
          data-testid="recipe-category"
        >
          { strType === 'strMeal' ? 'Comida' : 'Bebida' }
        </h4>
        { ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <label
              htmlFor={ food[ingredient] }
              className={ verifyrecipe
                  && savedRecipe[recipe][food[idRecipe]]
                    .includes(food[ingredient]) ? 'riscado' : 'not-select' }
            >
              <input
                type="checkbox"
                id={ food[ingredient] }
                name={ food[ingredient] }
                onClick={ (event) => handleClick(event, items, newItems) }
                defaultChecked={ verifyrecipe
                    && savedRecipe[recipe][food[idRecipe]]
                      .includes(food[ingredient]) }
              />
              &gt;
              {' '}
              { food[ingredient] }
            </label>
          </li>
        )) }
      </ul>
      <p
        className="instructions"
        data-testid="instructions"
      >
        { food.strInstructions }
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="end-recipe"
          data-testid="finish-recipe-btn"
          disabled={ ingredients.length !== verifyrecipe.length }
          onClick={ () => {
            setLocalStorage(items, idRecipe, type);
          } }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}
