import {
  React, useEffect, useRef, useState,
} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../utils/validator';
import { validationSettings } from '../utils/constants';

function EditAvatarPopup(props) {
  const {
    isOpen, onClose, onUpdateAvatar, isLoading,
  } = props;
  const { inputClass, errorClass } = validationSettings;
  const {
    values,
    handleChange,
    errors,
    inputsClasses,
    errorsClasses,
    isValid,
    resetForm,
  } = useFormAndValidation();
  const [buttonText, setButtonText] = useState('Сохранить');
  const interval = useRef();

  useEffect(() => {
    if (isLoading) {
      const dots = ['.', '..', '...'];
      let i = 0;
      interval.current = setInterval(() => {
        setButtonText(`Сохранение${dots[i]}`);
        i = (i === 2) ? 0 : i + 1;
      }, 200);
    } else {
      clearInterval(interval.current);
      setButtonText('Сохранить');
    }
  }, [isLoading]);

  useEffect(() => {
    resetForm(
      { data: '' },
      { data: '' },
      { data: inputClass },
      { data: errorClass },
      false,
    );
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values.data);
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      formValidity={isValid}>
      <input
        id="avatar-link-input"
        name="data"
        required
        type="url"
        className={inputsClasses.data}
        placeholder="Ссылка на аватар"
        value={values.data || ''}
        onChange={handleChange} />
      <span className={errorsClasses.data}>{errors.data}</span>
    </PopupWithForm>

  );
}

export default EditAvatarPopup;
