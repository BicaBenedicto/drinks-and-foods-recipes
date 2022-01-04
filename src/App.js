import React, { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Context from './services/Context';
import store from './redux/store/index';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import InProgress from './pages/InProgress';
import Explorar from './pages/Explorar';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import Perfil from './pages/Perfil';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import Details from './pages/Details';

function App() {
  const [login, changeLogin] = useState({ email: '', password: '' });
  const [searchFood, setSearchFood] = useState({ value: '', type: 'nome' });
  const [meals, setMeals] = useState({});
  const [categories, setCategories] = useState({});
  const [item, setItem] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const STORE_CONTEXT = {
    login,
    changeLogin,
    searchFood,
    setSearchFood,
    meals,
    setMeals,
    categories,
    setCategories,
    item,
    setItem,
    ingredients,
    setIngredients,
    measures,
    setMeasures,

  };

  return (
    <Provider store={ store }>
      <Context.Provider value={ STORE_CONTEXT }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas/:id/in-progress" component={ InProgress } />
          <Route path="/bebidas/:id/in-progress" component={ InProgress } />
          <Route path="/comidas/:id" component={ Details } />
          <Route path="/bebidas/:id" component={ Details } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </Context.Provider>
    </Provider>

  );
}

export default App;
