const URL = {
  searchByIngredients: {
    comidas: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
  },
  searchByName: {
    comidas: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  },
  searchByFirstLetter: {
    comidas: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  },
  searchByCategory: {
    comidas: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  },
  renderByList: {
    comidas: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  },
  renderByID: {
    comidas: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
    bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  },
  renderByRandom: {
    comidas: 'https://www.themealdb.com/api/json/v1/1/random.php',
    bebidas: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  },
  renderByFoodArea: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
};

async function fetchIngrediente(ingrediente, page) {
  const { searchByIngredients } = URL;
  const response = await fetch(`${searchByIngredients[page
    .toLowerCase()]}${ingrediente}`);
  const results = await response.json();
  return results.meals || results.drinks;
}

async function fetchName(name, page) {
  const { searchByName } = URL;
  const response = await fetch(`${searchByName[page.toLowerCase()]}${name}`);
  const results = await response.json();
  return results.meals || results.drinks;
}

async function fetchFirstLetter(firstLetter, page) {
  const { searchByFirstLetter } = URL;
  const response = await fetch(`${searchByFirstLetter[page
    .toLowerCase()]}${firstLetter}`);
  const results = await response.json();
  return results.meals || results.drinks;
}

async function fetchCategory(category, page) {
  const { searchByCategory } = URL;
  const response = await fetch(`${searchByCategory[page.toLowerCase()]}${category}`);
  const results = await response.json();
  return results.meals || results.drinks;
}

async function fetchList(page) {
  const { renderByList } = URL;
  const response = await fetch(`${renderByList[page.toLowerCase()]}`);
  const results = await response.json();
  return results.meals || results.drinks;
}

async function fetchID(id, page) {
  const { renderByID } = URL;
  const response = await fetch(`${renderByID[page.toLowerCase()]}${id}`);
  const results = await response.json();
  return results.meals || results.drinks;
}

async function fetchRandom(pageType) {
  const { renderByRandom } = URL;
  const response = await fetch(renderByRandom[pageType]);
  const results = await response.json();
  return results.meals || results.drinks;
}

async function fetchFoodArea() {
  const { renderByFoodArea } = URL;
  const response = await fetch(renderByFoodArea);
  const results = await response.json();
  return results.meals;
}

export {
  fetchIngrediente,
  fetchName,
  fetchFirstLetter,
  fetchCategory,
  fetchList,
  fetchID,
  fetchRandom,
  fetchFoodArea,
};
