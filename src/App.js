import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Context from './services/Context';
import store from './redux/store/index';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';

function App() {
  const [login, changeLogin] = useState({ email: '', password: '' });

  const STORE_CONTEXT = {
    login,
    changeLogin,
  };

  return (
    <Provider store={ store }>
      <Context.Provider value={ STORE_CONTEXT }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/comidas/:id" component="Sem Header" />
          <Route path="/bebidas/:id" component="Sem Header" />
          <Route path="/comidas/:id/in-progress" component="Sem Header" />
          <Route path="/bebidas/:id/in-progress" component="Sem Header" />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/explorar/comidas" component="" />
          <Route path="/explorar/bebidas" component="" />
          <Route path="/explorar/comidas/ingredientes" component="" />
          <Route path="/explorar/bebidas/ingredientes" component="" />
          <Route path="/explorar/comidas/area" component="" />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </Context.Provider>
    </Provider>

  );
}

export default App;
