const meals = require('./meals');
const oneMeal = require('./oneMeal');
const soupMeals = require('./soupMeals');
const beefMeals = require('./beefMeals');
const breakfastMeals = require('./breakfastMeals');
const chickenMeals = require('./chickenMeals');
const dessertMeals = require('./dessertMeals');
const goatMeals = require('./goatMeals');
const emptyMeals = require('./emptyMeals');
const mealCategories = require('./mealCategories');
const mealIngredients = require('./mealIngredients');
const mealsByIngredient = require('./mealsByIngredient');
const drinks = require('./drinks');
const oneDrink = require('./oneDrink');
const ginDrinks = require('./ginDrinks');
const ordinaryDrinks = require('./ordinaryDrinks');
const cocktailDrinks = require('./cocktailDrinks');
const milkDrinks = require('./milkDrinks');
const otherDrinks = require('./otherDrinks');
const cocoaDrinks = require('./cocoaDrinks');
const emptyDrinks = require('./emptyDrinks');
const drinkCategories = require('./drinkCategories');
const drinkIngredients = require('./drinkIngredients');
const drinksByIngredient = require('./drinksByIngredient');
const areas = require('./areas');
const japaneseMeals = require('./japaneseMeals');
const italianMeals = require('./italianMeals');

const URL = {
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': mealCategories,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': drinkCategories,
  'https://www.themealdb.com/api/json/v1/1/list.php?i=list': mealIngredients,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken': mealsByIngredient,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list': drinkIngredients,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum': drinksByIngredient,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': drinks,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau': emptyDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa': cocoaDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown': otherDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake': milkDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail': cocktailDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink': ordinaryDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin': ginDrinks,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau': emptyMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat': goatMeals,
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list': areas,
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese': japaneseMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert': dessertMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken': chickenMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast': breakfastMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': beefMeals,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=soup': soupMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian': italianMeals,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata': oneMeal,
  'https://www.themealdb.com/api/json/v1/1/random.php': oneMeal,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771': oneMeal,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine': oneDrink,
  'https://www.thecocktaildb.com/api/json/v1/1/random.php': oneDrink,
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319': oneDrink,
};

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (URL[url]) {
      return Promise.resolve(URL[url]);
    }

    return Promise.resolve(meals);
  },
});

module.exports = fetch;
