import {authData} from './constants';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._contentType = options.headers['Content-Type'];
  }

  _resultHandler(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }


  authorize({email, password}) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({password, email})
    })
      .then(res => this._resultHandler(res));
  }
  register({email, password}) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({password, email})
    })
      .then(res => this._resultHandler(res));
  }
  checkToken() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': this._contentType
      },
      credentials: 'same-origin'
    })
      .then(res => this._resultHandler(res));
  }
}

export const auth = new Api(authData);
