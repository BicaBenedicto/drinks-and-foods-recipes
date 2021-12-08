import React, { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Context from './services/Context';
import store from './redux/store/index';

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
          {/* <Route path="/comidas" component={ Login } />
          <Route path="/bebidas" component={ Login } />
          <Route path='/comidas/:id' component={ Login } /> */}
        </Switch>
      </Context.Provider>
    </Provider>
  );
}

export default App;
