import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { actionFetchList, actionFetchCategory, actionFetchName } from '../redux/actions';
import Cards from '../components/Cards';
import Header from '../components/Header';
import '../styles/foodcard.css';
import Footer from '../components/Footer';
import '../styles/MealsOrDrinks.css';

function Foods() {
  const disp = useDispatch();
  const mealsLength = 12;
  const categoriesLength = 5;
  const { pathname } = useLocation();
  const [, PAGE] = pathname.split('/');
  const history = useHistory();
  const { location } = history;
  const typeObjPage = {
    pageActual: (PAGE === 'comidas' ? 'Comidas' : 'Bebidas'),
    idType: (PAGE === 'comidas' ? 'idMeal' : 'idDrink'),
    strType: (PAGE === 'comidas' ? 'strMeal' : 'strDrink'),
    strTypeThumb: (PAGE === 'comidas' ? 'strMealThumb' : 'strDrinkThumb'),
  };
  const { pageActual, idType, strType, strTypeThumb } = typeObjPage;
  useEffect(() => {
    if (!location.state || !location.state.fromExplorar) {
      disp(actionFetchName('', pageActual));
    }
    disp(actionFetchList(pageActual));
    history.push({ state: { fromExplorar: false } });
  }, [PAGE]);

  const { list, categories } = useSelector((state) => state.meal);

  function handleChange(target, strCategory) {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
      if (target.id !== checkbox.id) {
        checkbox.checked = false;
      }
    });
    if (target.checked && strCategory !== 'All') {
      return disp(actionFetchCategory(strCategory, pageActual));
    }
    return disp(actionFetchName('', pageActual));
  }

  return (
    <div className="main-page">
      <Header pageTitle={ pageActual } />
      <div className="all-categories">
        <label htmlFor="All" className="meals-categories">
          <input
            data-testid="All-category-filter"
            id="All"
            type="checkbox"
            name="category"
            value="All"
            onClick={ ({ target }) => handleChange(target, 'All') }
          />
          All
        </label>
        {
          categories.filter((_, index) => index < categoriesLength)
            .map((category, index) => (
              <label
                className="meals-categories"
                key={ index }
                htmlFor={ category.strCategory }
              >
                <input
                  data-testid={ `${category.strCategory}-category-filter` }
                  id={ category.strCategory }
                  type="checkbox"
                  name="category"
                  value={ category.strCategory }
                  onClick={ ({ target }) => handleChange(target, category.strCategory) }
                />
                { category.strCategory }
              </label>
            ))
        }
      </div>
      <div className="meals-cards">
        { !list || !categories
          ? <div>Carregando...</div>
          : list.filter((_, index) => index < mealsLength)
            .map((meal, index) => (
              <Link
                className="card"
                data-testid={ `${index}-recipe-card` }
                key={ index }
                to={ `/${PAGE}/${meal[idType]}` }
              >
                <Cards
                  name={ meal[strType] }
                  thumb={ meal[strTypeThumb] }
                  index={ index }
                />
              </Link>
            ))}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
