import {
  React, useContext, useState, useEffect,
} from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const {
    card,
    onCardClick,
    onDeleteClick,
    onCardLike,
  } = props;

  const [likeIsLoading, setLikeIsLoading] = useState(false);
  const { _id: currentUserId } = useContext(CurrentUserContext);

  const {
    likes, owner, name, link,
  } = card;
  const currentOwnerId = owner;
  const isOwn = currentUserId === currentOwnerId;
  const isLiked = likes.some((likeId) => likeId === currentUserId);

  const deleteBtnClassName = isOwn ? 'element__delete-button' : 'element__delete-button element__delete-button_hidden';
  const likeBtnLikedClassName = isLiked ? 'element__like-button element__like-button_active' : '';
  const likeBtnLoadingClassName = likeIsLoading ? 'element__like-button_loading' : '';
  const likeBtnClassName = `element__like-button ${likeBtnLikedClassName} ${likeBtnLoadingClassName}`;

  useEffect(() => {
    setLikeIsLoading(false);
  }, [likes]);

  function handleClick() {
    onCardClick(card);
  }
  function handleDelete() {
    onDeleteClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
    setLikeIsLoading(true);
  }

  return (
    <figure className="element">
      <button className="element__picture-button" style={{ backgroundImage: `url(${link})` }} onClick={handleClick}/>
      <button type="button" className={deleteBtnClassName} onClick={handleDelete}></button>
      <figcaption className="element__caption">
        <h2 className="element__text">{name}</h2>
        <div className="element__like-container">
          <button type="button" className={likeBtnClassName} onClick={handleLikeClick}></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </figcaption>
    </figure>);
}

export default Card;
