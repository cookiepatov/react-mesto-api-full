import React from 'react';

function PopupWithForm(props) {
  const {
    name, title, children, isOpen, onClose, onSubmit, formValidity, buttonText,
  } = props;
  const popupClassname = isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`;

  return (
    <section className={popupClassname}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">
          {title}
        </h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
        <button
          type="submit"
          className="popup__button"
          disabled={!formValidity}>{buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
