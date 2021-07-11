import { React } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register(props) {
  const { loggedIn, onRegister } = props;

  return (
    <div className="auth-form">
      <h2 className="auth-form__header">
        Регистрация
      </h2>
      <AuthForm
        buttonText={'Зарегистрироваться'}
        loggedIn={loggedIn}
        onSubmit={onRegister} />
      <p className="auth-form__bottom-message">Уже зарегистрированы? <Link className="auth__link" to="/sign-in"> Войти </Link></p>
    </div>
  );
}

export default withRouter(Register);
