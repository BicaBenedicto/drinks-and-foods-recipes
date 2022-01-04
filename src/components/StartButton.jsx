import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../services/Context';
import '../styles/ButtonStart.css';

export default function StartButton(props) {
  const { id, page } = props;
  const history = useHistory();
  const { inProgressRecipes } = useContext(Context);
  const { recipesInProgress, addRecipeInProgress, actualIngredients } = inProgressRecipes;
  const TYPE = (page === 'comidas' ? 'meals' : 'cocktails');

  useEffect(() => {
    const recipesInProgressSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgressSaved) addRecipeInProgress(recipesInProgressSaved);
  }, []);

  const onStartButton = () => {
    addRecipeInProgress({ ...recipesInProgress,
      [TYPE]: { [id]: [...actualIngredients] } });
    localStorage.setItem('inProgressRecipes', JSON.stringify(({ ...recipesInProgress,
      [TYPE]: { [id]: [...actualIngredients] } })));
    history.push(`/${page}/${id}/in-progress`);
  };

  const verifyRecipe = () => {
    const verify = recipesInProgress[TYPE][id];

    if (verify) return 'Continuar Receita';
    return 'Iniciar Receita';
  };

  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-recipe"
      onClick={ onStartButton }
    >
      { verifyRecipe() }
    </button>
  );
}

StartButton.propTypes = {
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
