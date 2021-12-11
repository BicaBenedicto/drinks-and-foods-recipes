import React from 'react';
import { useHistory } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const history = useHistory();

  function redirect(route) {
    history.push(route);
  }

  return (
    <div data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => redirect('/bebidas') }
      >
        <img src={ drinks } alt="drinkIcon" data-testid="drinks-bottom-btn" />

      </button>
      <button
        type="button"
        onClick={ () => redirect('/explorar') }
      >
        <img src={ explore } alt="exploreIcon" data-testid="explore-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => redirect('/comidas') }
      >
        <img src={ meal } alt="mealIcon" data-testid="food-bottom-btn" />
      </button>
    </div>
  );
}

export default Footer;
