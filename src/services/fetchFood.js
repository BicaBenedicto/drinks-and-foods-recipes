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
};

async function fetchIngrediente(ingrediente, page) {
  const { searchByIngredients } = URL;
  const response = await fetch(`${searchByIngredients[page
    .toLowerCase()]}${ingrediente}`);
  const result = await response.json();
  return result.meals || result.drinks;
}

async function fetchName(name, page) {
  const { searchByName } = URL;
  console.log(`${searchByName[page.toLowerCase()]}${name}`);
  const response = await fetch(`${searchByName[page.toLowerCase()]}${name}`);
  const result = await response.json();
  console.log(result);
  return result.meals || result.drinks;
}

async function fetchFirstLetter(firstLetter, page) {
  const { searchByFirstLetter } = URL;
  const response = await fetch(`${searchByFirstLetter[page
    .toLowerCase()]}${firstLetter}`);
  const result = await response.json();
  return result.meals || result.drinks;
}

async function fetchCategory(category, page) {
  const { searchByCategory } = URL;
  const response = await fetch(`${searchByCategory[page.toLowerCase()]}${category}`);
  const result = await response.json();
  return result.meals || result.drinks;
}

async function fetchList(page) {
  const { renderByList } = URL;
  const response = await fetch(`${renderByList[page.toLowerCase()]}`);
  const result = await response.json();
  return result.meals || result.drinks;
}

export {
  fetchIngrediente,
  fetchName,
  fetchFirstLetter,
  fetchCategory,
  fetchList,
};
