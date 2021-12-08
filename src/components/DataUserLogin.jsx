import React from 'react';
import { Link } from 'react-router-dom';

export default function DataUserLogin() {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [buttonActivated, setButtonActivated] = React.useState(false);

  function handleEntrarButton() {
    const minLengthPassword = 5;
    const emailIsValid = userEmail.includes('@') && userEmail.includes('.com');
    const passwordIsValid = userPassword.length > minLengthPassword;
    if (emailIsValid && passwordIsValid) {
      return setButtonActivated(true);
    }
    return setButtonActivated(false);
  }

  React.useEffect(() => {
    handleEntrarButton();
  }, [userEmail, userPassword]);
  return (
    <main>
      <input
        value={ userEmail }
        onChange={ ({ target }) => setUserEmail(target.value) }
        type="text"
        placeholder="Digite seu email"
        data-testid="email-input"
      />
      <input
        value={ userPassword }
        onChange={ ({ target }) => setUserPassword(target.value) }
        type="password"
        placeholder="Digite sua senha"
        data-testid="password-input"
      />
      <Link to="/comidas">
        <button
          disabled={ !buttonActivated }
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </Link>
    </main>
  );
}
