import React from 'react';

import check from '../images/check.svg';
import cross from '../images/cross.svg';

function InfoTooltip(props) {
  const {isOpen, onClose, accepted} = props;
  const popupClassname = isOpen ? `popup popup_type_tooltip popup_opened` : `popup popup_type_tooltip`
  const { text, picSrc } = accepted ?
  {
    text: "Вы успешно зарегистрировались!",
    picSrc: check
  }
    :
  {
    text: "Что-то пошло не так! Попробуйте ещё раз.",
    picSrc: cross
  }
  return (
    <section className={popupClassname}>
      <div className="popup__container">
        <button type="button" className="popup__close-button popup__close-button_type_info" onClick={onClose}></button>
          <img className="popup__info-img" alt="Информационное изображение" src={picSrc} />
          <p className="popup__info-text">
            {text}
          </p>
      </div>
    </section>
  );
}

export default InfoTooltip;
