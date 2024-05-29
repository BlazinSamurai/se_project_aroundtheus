export default class FormValidator {
  constructor(settings, formToValidate) {
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.errorClass;

    this._validatedForm = formToValidate;
  }

  _showInputError(inputEl) {
    this._errorClassEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._errorClassEl.id);
    this._errorClassEl.textContent = inputEl.validationMessage;
    this._errorClassEl.classList.add(`#${inputEl.id}-error`);
    console.log("Error: Invalid!");
  }

  _hideInputError(inputEl) {
    this._errorClassEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._errorClassEl.id);
    this._errorClassEl.textContent = "";
    this._errorClassEl.classList.remove(`#${inputEl.id}-error`);
    console.log("hide error message: Valid!");
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
      this._enableButton();
    } else {
      this._showInputError(inputEl);
      this._disableButton();
    }
  }

  _disableButton() {
    this._buttons.forEach((button) => {
      button.classList.add(`${this._buttons[1].classList[0]}_disabled`);
      button.disabled = true;
    });
  }

  _enableButton() {
    this._buttons.forEach((button) => {
      button.classList.remove(`${this._buttons[1].classList[0]}_disabled`);
      button.disabled = false;
    });
  }

  _setEventListeners() {
    this._inputs = [...document.querySelectorAll(`${this._inputSelector}`)];
    this._errors = [...document.querySelectorAll(`${this._inputErrorClass}`)];
    this._buttons = [
      ...document.querySelectorAll(`${this._submitButtonSelector}`),
    ];

    this._inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        e.preventDefault();
        this._checkInputValidity(input);
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
