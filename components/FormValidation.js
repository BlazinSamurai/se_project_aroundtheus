export default class FormValidator {
  constructor(settings, formToValidate) {
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.errorClass;

    this._validatedForm = formToValidate;
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
      this._disableButton();
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
    console.log("ran");
    this._validatedFormInputs = [];
    this._inputs = [...document.querySelectorAll(`${this._inputSelector}`)];
    this._errors = [...document.querySelectorAll(`${this._inputErrorClass}`)];
    this._buttons = [
      ...document.querySelectorAll(`${this._submitButtonSelector}`),
    ];

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
    //this._disableButton();
  }

  resetButton() {
    this._disableButton();
  }

  enableValidation() {
    this._validatedForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
