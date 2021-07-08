import {React, useEffect} from 'react';
import {useFormAndValidation} from '../utils/validator';
import {authValidation} from '../utils/constants';

function AuthForm(props) {
  const { loggedIn, onSubmit, buttonText} = props;
  const { inputClass, errorClass } = authValidation;
  const { values,
    handleChange,
    errors,
    inputsClasses,
    errorsClasses,
    isValid,
    resetForm } = useFormAndValidation(true);

  useEffect(() => {
    resetForm(
      { email: '', password: '' },
      { email: '', password: '' },
      { email: inputClass, password: inputClass },
      { email: errorClass, password: errorClass });
  }, [loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);

  }

  return (
    <form className="auth-form__container" onSubmit={handleSubmit}>
      <fieldset className="auth-form__inputs">
        <input
          className={inputsClasses.email}
          id="email-input"
          type="email"
          required
          name="email"
          minLength="2"
          maxLength="30"
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}>
        </input>
        <span className={errorsClasses.email}>{errors.email}</span>
        <input
          className={inputsClasses.password}
          id="password-input"
          type="password"
          required
          name="password"
          minLength="7"
          maxLength="30"
          placeholder="Пароль"
          value={values.password || ''}
          onChange={handleChange}>
        </input>
        <span className={errorsClasses.password}>{errors.password}</span>
      </fieldset>
      <button className="auth-form__button" type="submit" disabled={!isValid}>{buttonText}</button>
    </form>
  );
}

export default AuthForm;
