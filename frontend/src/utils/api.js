import {apiData} from './constants';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  _resultHandler(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }


  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      credentials: 'include'
    })
      .then(res => this._resultHandler(res));
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include'
    }).then(res => this._resultHandler(res));

  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': this._contentType
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        about
      })
    }).then(res => this._resultHandler(res));
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': this._contentType
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar
      })
    }).then(res => this._resultHandler(res));

  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        link
      })
    }).then(res => this._resultHandler(res));
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => this._resultHandler(res));
  }

  changeLikeCardStatus(id, setLiked) {
    if(setLiked) {
      return this.likeCard(id);
    }
    return this.dislikeCard(id);
  }

  likeCard(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'PUT',
      credentials: 'include'
    }).then(res => this._resultHandler(res));
  }

  dislikeCard(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => this._resultHandler(res));
  }
}

export const api = new Api(apiData);