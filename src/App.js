import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import store from './redux/store/index';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import InProgress from './pages/InProgress';
import Explorar from './pages/Explorar';
import ExplorarBebidasOuComidas from './pages/ExplorarBebidasOuComidas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import Perfil from './pages/Perfil';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import ProviderHook from './services/Provider';

function App() {
  return (
    <Provider store={ store }>
      <ProviderHook>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas/:id/in-progress" component={ InProgress } />
          <Route path="/bebidas/:id/in-progress" component={ InProgress } />
          <Route path="/comidas/:id" component={ Details } />
          <Route path="/bebidas/:id" component={ Details } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
          <Route path="/explorar/bebidas/area" component={ NotFound } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route path="/explorar/bebidas" component={ ExplorarBebidasOuComidas } />
          <Route path="/explorar/comidas" component={ ExplorarBebidasOuComidas } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </ProviderHook>
    </Provider>

  );
}

export default App;
