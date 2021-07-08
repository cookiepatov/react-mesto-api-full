import {React, useState, useEffect, useContext, useRef} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

import {useFormAndValidation} from '../utils/validator';
import {validationSettings} from '../utils/constants';

function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser, isLoading} = props
  const {inputClass, errorClass} = validationSettings;
  const {values,
    handleChange,
    errors,
    inputsClasses,
    errorsClasses,
    isValid,
    resetForm} = useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState('Сохранить');
  const interval = useRef();

  useEffect(() => {
    if (isLoading) {
      const dots = ['.','..','...'];
      let i = 0
      interval.current = setInterval(()=>{
        setButtonText(`Сохранение${dots[i]}`);
        i = (i === 2) ? 0 : i + 1;
      },200)
    } else {
      clearInterval(interval.current)
      setButtonText(`Сохранить`);
    }
  },[isLoading])

  useEffect(() => {
    resetForm(
      {name: currentUser.name, description: currentUser.about},
      {name: '', description: ''},
      {name:inputClass, description:inputClass},
      {name:errorClass, description:errorClass},
      true);
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    const {name, description: about} = values;
    onUpdateUser({name, about});
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      formValidity={isValid}>
      <input
        id="profile-name-input"
        name="name"
        required
        minLength="2"
        maxLength="40"
        className={inputsClasses.name}
        placeholder="Ваше имя"
        value={values.name || ''}
        onChange={handleChange} />
      <span className={errorsClasses.name}>{errors.name}</span>
      <input
        id="profile-description-input"
        name="description"
        required minLength="2"
        maxLength="200"
        className={inputsClasses.description}
        placeholder="Описание"
        value={values.description || ''}
        onChange={handleChange} />
      <span className={errorsClasses.description}>{errors.description}</span>
    </PopupWithForm>)
}

export default EditProfilePopup
