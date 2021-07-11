import { apiData } from './constants';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}` : null;
    this._contentType = options.headers['Content-Type'];
  }

  // eslint-disable-next-line class-methods-use-this
  _resultHandler(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._resultHandler(res));
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._resultHandler(res));
  }

  checkToken() {
    if (this._token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': this._contentType,
          authorization: this._token,
        },
      })
        .then((res) => this._resultHandler(res));
    }
    return Promise.reject(new Error('no token'));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => this._resultHandler(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._resultHandler(res));
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': this._contentType,
        authorization: this._token,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._resultHandler(res));
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': this._contentType,
        authorization: this._token,
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._resultHandler(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType,
        authorization: this._token,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._resultHandler(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._resultHandler(res));
  }

  changeLikeCardStatus(id, setLiked) {
    if (setLiked) {
      return this.likeCard(id);
    }
    return this.dislikeCard(id);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._resultHandler(res));
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._resultHandler(res));
  }

  setNewToken(jwt) {
    this._token = `Bearer ${jwt}`;
  }
}

export default new Api(apiData);
