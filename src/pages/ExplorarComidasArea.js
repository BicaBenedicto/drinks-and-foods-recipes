import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { actionFetchFoodArea } from '../redux/actions/index';

function ExplorarComidasArea() {
  const disp = useDispatch();
  const foodArea = useSelector((state) => state.meal.item);
  console.log(foodArea);
  console.log(foodArea.length);

  useEffect(() => {
    disp(actionFetchFoodArea());
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Origem" />
      <div>
        {foodArea
          ? (<select data-testid="explore-by-area-dropdown">
            {foodArea.map((area, index) => (
              <option
                key={ index }
                value={ area }
                data-testid={ `${area}-option` }
              >
                { area }
              </option>
            ))}
            </select> )
          : <span>Carregando...</span>}
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidasArea;
