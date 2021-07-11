import {
  React, useState, useEffect, useRef,
} from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  const {
    isOpen, onClose, selectedCard, onDeleteCard, isLoading,
  } = props;
  const [buttonText, setButtonText] = useState('Да');
  const interval = useRef();

  useEffect(() => {
    if (isLoading) {
      const dots = ['.', '..', '...'];
      let i = 0;
      interval.current = setInterval(() => {
        setButtonText(`Удаление${dots[i]}`);
        i = (i === 2) ? 0 : i + 1;
      }, 200);
    } else {
      clearInterval(interval.current);
      setButtonText('Да');
    }
  }, [isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(selectedCard);
  }

  return (
    <PopupWithForm
      name={'remove-card'}
      title={'Вы уверены?'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      formValidity={true}>
  </PopupWithForm>

  );
}

export default DeleteCardPopup;
