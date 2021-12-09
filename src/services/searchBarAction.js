import {
  actionfetchFirstLetter,
  actionfetchIngrediente,
  actionfetchName,
  actionfetchFirstLetterDrink,
  actionfetchIngredienteDrink,
  actionfetchNameDrink,
} from '../redux/actions';

const typeAction = (page) => (page.includes('comidas') ? ({
  ingrendiente: (value) => actionfetchIngrediente(value),
  nameFood: (value) => actionfetchName(value),
  firstLeter: (value) => actionfetchFirstLetter(value),
}) : ({
  ingrendiente: (value) => actionfetchIngredienteDrink(value),
  nameFood: (value) => actionfetchNameDrink(value),
  firstLeter: (value) => actionfetchFirstLetterDrink(value),
}));

export default typeAction;
