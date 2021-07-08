const validationSettings = {
  inputClass: 'popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassVisible: 'popup__error_visible'
};

const authValidation = {
  inputClass: 'auth-form__input',
  inputErrorClass: 'auth-form__input_type_error',
  errorClass: 'auth-form__error',
  errorClassVisible: 'auth-form__error_visible'
}

const apiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '175f949a-57a4-4e41-845e-76eb0a4e61c1',
    'Content-Type': 'application/json'
  }
}

const authData = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
}

export {
  validationSettings,
  authValidation,
  apiData,
  authData
};
