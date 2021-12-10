import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionFetchList, actionFetchCategory, actionFetchName } from '../redux/actions';
import Cards from '../components/Cards';
import Header from '../components/Header';
import '../styles/foodcard.css';
import Footer from '../components/Footer';

const pageActual = 'Bebidas';

function Bebidas() {
  const disp = useDispatch();
  const mealsLength = 12;
  const categoriesLength = 5;

  useEffect(() => {
    disp(actionFetchList(pageActual));
    disp(actionFetchName('', pageActual));
  }, []);

  const { list, categories } = useSelector((state) => state.meal);

  if (!list || !categories) {
    return <div>Carregando...</div>;
  }

  function handleChange(target, strCategory) {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
      if (target.id !== checkbox.id) {
        checkbox.checked = false;
      }
    });
    if (target.checked) {
      if (strCategory === 'All') {
        disp(actionFetchName('', pageActual));
      } else {
        disp(actionFetchCategory(strCategory, pageActual));
      }
    } else {
      disp(actionFetchName('', pageActual));
    }
  }

  return (
    <div className="main-page">
      <Header pageTitle={ pageActual } />
      <div className="all-categories">
        <label htmlFor="All">
          <input
            className="all-categorie"
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
        { list.filter((_, index) => index < mealsLength)
          .map((meal, index) => (
            <Link
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
              to={ `/comidas/${meal.idDrink}` }
            >
              <Cards
                name={ meal.strDrink }
                thumb={ meal.strDrinkThumb }
                index={ index }
              />
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;