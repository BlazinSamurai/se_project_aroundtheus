export default class FormValidator {
  constructor(settings, formToValidate) {
    this._formSelector = settings.formEl;
    this._inputSelector = settings.inputEl;
    this._submitButtonSelector = settings.submitButtonEl;
    this._inputErrorClass = settings.errorEl;

    this._validatedForm = formToValidate;
  }

  _showInputError(inputEl) {
    this._errorClassEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._errorClassEl.id);
    this._errorClassEl.textContent = inputEl.validationMessage;
    this._errorClassEl.classList.add(`#${inputEl.id}-error`);
  }

  _hideInputError(inputEl) {
    this._errorClassEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._errorClassEl.id);
    this._errorClassEl.textContent = "";
    this._errorClassEl.classList.remove(`#${inputEl.id}-error`);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
      this._disableButton();
    } else {
      this._hideInputError(inputEl);
      this._enableButton();
    }
  }

  _disableButton() {
    this._submitButtonSelector.forEach((button) => {
      button.classList.add(
        `${this._submitButtonSelector[1].classList[0]}_disabled`
      );
      button.disabled = true;
    });
  }

  _enableButton() {
    this._submitButtonSelector.forEach((button) => {
      button.classList.remove(
        `${this._submitButtonSelector[1].classList[0]}_disabled`
      );
      button.disabled = false;
    });
  }

  _setEventListeners() {
    this._inputSelector.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        e.preventDefault();

        this._checkInputValidity(inputEl);
      });
    });
  }

  enableValidation() {
    this._validatedForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
