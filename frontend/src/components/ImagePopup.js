import React from 'react';

function ImagePopup(props) {
  const {isOpen, onClose, selectedCard} = props;
  const src = selectedCard ? selectedCard.link : '#';
  const title = selectedCard ? selectedCard.name : '';
  const popupClass = isOpen ? 'popup popup_opened popup_type_full-view' : 'popup popup_type_full-view'
  return (
    <section className={popupClass}>
      <figure className="popup__picture-container">
        <div className="popup__picture-elements">
          <button type="button" className="popup__close-button" onClick={onClose}></button>
          <img className="popup__full-picture"
            alt="Полноэкранный просмотр"
            src={src} />
          <h2 className="popup__picture-title">{title}</h2>
        </div>
      </figure>
    </section>
  );
}

export default ImagePopup;
