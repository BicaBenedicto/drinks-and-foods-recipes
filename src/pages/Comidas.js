import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/foodcard.css';

const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function Foods() {
  const [foods, setFoods] = useState({});
  const [categories, setCategories] = useState({});
  const x = useSelector((state) => state.user.foods);
  const mealsLength = 12;
  const categoriesLength = 5;

  const fetchComidas = (endPointFetch, setState) => {
    fetch(endPointFetch)
      .then((resolve) => resolve.json())
      .then((response) => setState(response));
  };

  useEffect(() => {
    fetchComidas(endPoint, setFoods);
    fetchComidas('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setCategories);
  }, []);

  if (!foods.meals || !categories.meals) {
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
        fetchComidas(endPoint, setFoods);
      } else {
        fetchComidas(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`, setFoods);
      }
    } else {
      fetchComidas(endPoint, setFoods);
    }
  }

  return (
    <div className="main-page">
      <Header pageTitle="Comidas" />
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
          x && x.filter((_, index) => index < categoriesLength)
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
      <div className="foods-cards">
        { x && x.filter((_, index) => index < mealsLength)
          .map((meal, index) => (
            <Link
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
              to={ `/comidas/${meal.idMeal}` }
            >
              <Cards
                name={ meal.strMeal }
                thumb={ meal.strMealThumb }
                index={ index }
              />
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default connect()(Foods);
