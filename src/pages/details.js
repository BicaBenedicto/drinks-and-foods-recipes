import React from 'react';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import StartButton from '../components/StartButton';

export default function Details() {
  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ data[foodType][0][`str${food}Thumb`] }
        alt={ data[foodType][0][`str${food}`] }
        width="100px"
        height="100px"
      />
      <h1 data-testid="recipe-title">{ data[foodType][0][`str${food}`] }</h1>
      <h4 data-testid="recipe-category">
        { data[foodType][0].strAlcoholic || data[foodType][0].strCategory }
      </h4>
      <span data-testid="instructions">{ data[foodType][0].strInstructions }</span>
      { data.meals && <iframe
        title={ data[foodType][0][`str${food}`] }
        data-testid="video"
        src={ `https://www.youtube.com/embed/${data[foodType][0].strYoutube.split('=')[1]}` }
        width="420"
        height="345"
      /> }
      <div className="div-scroll">
        {recomendedDrinks.map((recomended, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
            style={ { width: '100px', height: '100px', margin: '10px 5px' } }
          >
            <img
              src={ recomended[`str${recomendedFood}Thumb`] }
              alt={ recomended[`str${recomendedFood}`] }
              width="90px"
              height="90px"
            />
            <h6>{ recomended.strCategory }</h6>
            <h3
              data-testid={ `${index}-recomendation-title` }
            >
              { recomended[`str${recomendedFood}`] }
            </h3>
          </div>
        ))}
      </div>
      <ShareButton />
      <FavoriteButton items={ items } />
      <StartButton
        page={ type }
        idReceita={ idReceita }
        storageType={ storageType }
      />
    </main>
  );
}
