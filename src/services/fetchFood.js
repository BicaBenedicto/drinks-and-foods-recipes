async function fetchIngrediente(ingrediente) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const result = await response.json();
  console.log(result);
  return result.meals;
}

async function fetchName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await response.json();
  return result.meals;
}

async function fetchFirstLetter(firstLetter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const result = await response.json();
  return result.meals;
}

async function fetchIngredienteDrink(ingrediente) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const result = await response.json();
  return result.drinks;
}

async function fetchNameDrink(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await response.json();
  return result.drinks;
}

async function fetchFirstLetterDrink(firstLetter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const result = await response.json();
  return result.drinks;
}

export {
  fetchIngrediente,
  fetchName,
  fetchFirstLetter,
  fetchIngredienteDrink,
  fetchNameDrink,
  fetchFirstLetterDrink,
};
