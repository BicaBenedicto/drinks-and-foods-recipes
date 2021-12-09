import React from 'react';
import PropTypes from 'prop-types';

export default function Cards({ name, thumb, index }) {
  return (
    <div className="foodcard">
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ name }
      />
      <p className="name-card-food" data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

Cards.propTypes = {
  name: PropTypes.string,
  thumb: PropTypes.string,
  index: PropTypes.index,
}.isRequired;
