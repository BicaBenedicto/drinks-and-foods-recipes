import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionLogin } from '../redux/actions';
import Context from '../services/Context';

export default function DataUserLogin() {
  const { login, changeLogin } = useContext(Context);
  const { email, password } = login;
  const [buttonActivated, setButtonActivated] = React.useState(false);
  const saveLogin = useDispatch();

  function handleEntrarButton() {
    const minLengthPassword = 6;
    const emailIsValid = email.includes('@') && email.includes('.com');
    const passwordIsValid = password.length >= minLengthPassword;
    if (emailIsValid && passwordIsValid) {
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('cocktailsToken', JSON.stringify(1));
      localStorage.setItem('user', JSON.stringify({ email }));
      return setButtonActivated(true);
    }

    return setButtonActivated(false);
  }

  const onButtomSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    saveLogin(actionLogin(email));
  };

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    changeLogin({ ...login, [name]: value });
  };

  React.useEffect(() => {
    handleEntrarButton();
  }, [email, password]);
  return (
    <form onSubmit={ onButtomSubmit }>
      <input
        value={ email }
        name="email"
        onChange={ onChangeInput }
        type="text"
        placeholder="Digite seu email"
        data-testid="email-input"
      />
      <input
        value={ password }
        name="password"
        onChange={ onChangeInput }
        type="password"
        placeholder="Digite sua senha"
        data-testid="password-input"
      />
      <Link to="/comidas">
        <button
          disabled={ !buttonActivated }
          type="submit"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </Link>
    </form>
  );
}
