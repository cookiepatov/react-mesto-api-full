import {React} from 'react';
import AuthForm from './AuthForm';

function Login(props) {
  const {loggedIn, onLogin} = props;

  return (
    <div className="auth-form">
      <h2 className="auth-form__header">
        Вход
      </h2>
      <AuthForm loggedIn={loggedIn} onSubmit={onLogin} buttonText={'Войти'}/>
    </div>
  );
}

export default Login;
