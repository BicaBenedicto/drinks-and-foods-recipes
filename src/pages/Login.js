<<<<<<< HEAD
import React from 'react';
import rockGlass from '../images/rockGlass.svg';
import DataUserLogin from '../components/DataUserLogin';

// function Login() {
//   const { login, changeLogin } = useContext(Context);
//   const saveLogin = useDispatch();

//   const onChangeLogin = ({ target }) => {
//     const { name, value } = target;
//     changeLogin({ ...login, [name]: value });
//   };

//   const OnButtomSubmit = (e) => {
//     e.preventDefault();
//     saveLogin(actionLogin(login.email));
//   };

//   return (
//     <div>
//       <div className="meals">
//         <span className="logo">TRYBE</span>
//         <object
//           className="rocksGlass"
//           type="image/svg+xml"
//           data={ rockGlass }
//         >
//           Glass
//         </object>
//       </div>
//       <form onSubmit={ OnButtomSubmit }>
//         <input
//           type="email"
//           name="email"
//           data-testid="email-input"
//           id="email-input"
//           placeholder="Seu e-mail"
//           value={ login.email }
//           onChange={ onChangeLogin }
//         />
//         <input
//           type="password"
//           name="password"
//           data-testid="password-input"
//           id="password-input"
//           placeholder="****"
//           value={ login.password }
//           onChange={ onChangeLogin }
//         />
//         <button
//           type="submit"
//           data-testid="login-submit-btn"
//         >
//           Entrar
//         </button>
//       </form>
//     </div>
//   );
// }
export default function login() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <DataUserLogin />
    </div>
  );
}
=======
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import Context from '../services/Context';
import rockGlass from '../images/rockGlass.svg';
import { actionLogin } from '../redux/actions';

function Login() {
  const { login, changeLogin } = useContext(Context);
  const saveLogin = useDispatch();

  const onChangeLogin = ({ target }) => {
    const { name, value } = target;
    changeLogin({ ...login, [name]: value });
  };

  const OnButtomSubmit = (e) => {
    e.preventDefault();
    saveLogin(actionLogin(login.email));
  };

  return (
    <div>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
      <form onSubmit={ OnButtomSubmit }>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          id="email-input"
          placeholder="Seu e-mail"
          value={ login.email }
          onChange={ onChangeLogin }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          id="password-input"
          placeholder="****"
          value={ login.password }
          onChange={ onChangeLogin }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
>>>>>>> main-group-22
