import {
  React, useState, useEffect, useRef,
} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../utils/validator';
import { validationSettings } from '../utils/constants';

function AddPlacePopup(props) {
  const {
    isOpen, onClose, onAddPlace, isLoading,
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
      { name: '', data: '' },
      { name: '', data: '' },
      { name: inputClass, data: inputClass },
      { name: errorClass, data: errorClass },
    );
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, data: link } = values;
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      formValidity={isValid}>
      <input
        id="place-name-input"
        name="name"
        required
        minLength="2"
        maxLength="30"
        className={inputsClasses.name}
        placeholder="Название"
        onChange={handleChange}
        value={values.name || ''} />
      <span className={errorsClasses.name}>{errors.name}</span>
      <input
        id="place-link-input"
        name="data"
        required
        type="url"
        className={inputsClasses.data}
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={values.data || ''}/>
      <span className={errorsClasses.data}>{errors.data}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
