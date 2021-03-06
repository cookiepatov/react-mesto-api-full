import {
  React, useEffect, useState, useCallback,
} from 'react';

import {
  Switch, useHistory, useLocation, Route, withRouter,
} from 'react-router-dom';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [popupDataIsLoading, setPopupDataIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipAcceptedStatus, setTooltipAcceptedStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  function closeAllPopups() {
    // eslint-disable-next-line no-use-before-define
    removeEventListeners();
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setImagePopupOpen(false);
    setTooltipOpen(false);
    setSelectedCard({});
    setCardToDelete({});
  }

  const closeOnEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }, []);

  const closeOnOverlay = useCallback((e) => {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }, []);

  function removeEventListeners() {
    document.removeEventListener('keydown', closeOnEsc);
    document.removeEventListener('pointerdown', closeOnOverlay);
  }

  function setEventListeners() {
    document.addEventListener('keydown', closeOnEsc);
    document.addEventListener('pointerdown', closeOnOverlay);
  }

  function openToolTip(state) {
    setTooltipOpen(true);
    setTooltipAcceptedStatus(state);
    setEventListeners();
  }

  function saveToken(jwt) {
    localStorage.setItem('jwt', jwt);
    api.setNewToken(jwt);
  }

  function checkToken() {
    api.checkToken().then(() => {
      setLoggedIn(true);
      history.push('/');
    }).catch((err) => {
      if (err.message !== 'no token') {
        openToolTip(false);
        console.log(err);
      }
    });
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, initialCardData]) => {
          setCurrentUser(user);
          setCards(initialCardData.cards);
          setUserEmail(user.email);
        }).catch((err) => {
          console.log(err);
          openToolTip(false);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEventListeners();
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEventListeners();
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setEventListeners();
    setAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setEventListeners();
    setDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardClick(card) {
    setEventListeners();
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    setPopupDataIsLoading(true);
    api.setUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        openToolTip(false);
        console.log(err);
      })
      .finally(() => {
        setPopupDataIsLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setPopupDataIsLoading(true);
    api.setUserAvatar(link)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        openToolTip(false);
        console.log(err);
      })
      .finally(() => {
        setPopupDataIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((likeId) => likeId === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((currentCards) => currentCards
          .map((currentCard) => (currentCard._id === card._id ? newCard : currentCard)));
        closeAllPopups();
      })
      .catch((err) => {
        openToolTip(false);
        console.log(err);
      });
  }

  function handleConfirmDelete(card) {
    setPopupDataIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((currentCards) => currentCards
          .filter((currentCard) => currentCard._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        openToolTip(false);
        console.log(err);
      })
      .finally(() => {
        setPopupDataIsLoading(false);
      });
  }

  function handleAddCard({ name, link }) {
    setPopupDataIsLoading(true);
    api.addNewCard(name, link)
      .then((data) => {
        setCards((currentCards) => [...currentCards, data.card]);
        closeAllPopups();
      })
      .catch((err) => {
        openToolTip(false);
        console.log(err);
      })
      .finally(() => {
        setPopupDataIsLoading(false);
      });
  }

  function handleSignIn({ email, password }) {
    api.authorize({ email, password }).then((user) => {
      saveToken(user.token);
      setLoggedIn(true);
      history.push('/');
    })
      .catch((err) => {
        openToolTip(false);
        console.log(err);
      });
  }

  function handleSignUp({ email, password }) {
    api.register({ email, password }).then(() => {
      openToolTip(true);
      history.push('/sign-in');
    }).catch((err) => {
      openToolTip(false);
      console.log(err);
    });
  }

  function removeToken() {
    localStorage.removeItem('jwt');
  }

  function handleSignOut() {
    removeToken();
    setLoggedIn(false);
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            currentLocation={useLocation().pathname}
            login={userEmail}
            signOut={handleSignOut} />
          <Switch>
            <Route
              exact
              path="/sign-in">
              <Login
                loggedIn={loggedIn}
                onLogin={handleSignIn} />
            </Route>
            <Route
              exact
              path="/sign-up">
              <Register
                loggedIn={loggedIn}
                onRegister={handleSignUp} />
            </Route>
          <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick} />
          </Switch>
          <Footer />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isTooltipOpen}
            accepted={tooltipAcceptedStatus} />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpen}
            isLoading={popupDataIsLoading} />
          <AddPlacePopup
            onAddPlace={handleAddCard}
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            isLoading={popupDataIsLoading} />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
            isLoading={popupDataIsLoading} />
          <DeleteCardPopup
            onDeleteCard={handleConfirmDelete}
            onClose={closeAllPopups}
            isOpen={isDeleteCardPopupOpen}
            selectedCard={cardToDelete}
            isLoading={popupDataIsLoading} />
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            selectedCard={selectedCard} />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
