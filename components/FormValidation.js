export default class FormValidator {
  constructor(settings, formToValidate) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.errorClass;

    this._validatedForm = formToValidate;
  }

  _enableButton() {
    this._button.classList.remove(`${this._submitButtonSelector}_disabled`);
    this._button.disabled = false;
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

  _returnsValidity() {
    return this._validatedFormInputs.every(
      (formInput) => formInput.validity.valid
    );
  }

  _toggleButtonState() {
    if (this._returnsValidity()) {
      this._enableButton();
    } else {
      this.disableButton();
    }
  }

  _checkInputValidity(inputEl) {
    if (this._returnsValidity()) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
  }

  _setEventListeners() {
    this._validatedFormInputs = [];

    this._inputs = [
      ...this._validatedForm.querySelectorAll(`.${this._inputSelector}`),
    ];

    this._button = this._validatedForm.querySelector(
      `.${this._submitButtonSelector}`
    );

    this._inputs.forEach((input) => {
      if (input.id.includes(this._validatedForm.id)) {
        this._validatedFormInputs.push(input);
      }
    });

    this._validatedFormInputs.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._checkInputValidity(formInput);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    this._button.classList.add(`${this._submitButtonSelector}_disabled`);
    this._button.disabled = true;
  }

  enableValidation() {
    this._validatedForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
