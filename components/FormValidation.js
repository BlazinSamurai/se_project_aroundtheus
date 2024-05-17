export default class Form {
  constructor(form, formToValidate) {
    this._formSelector = form.formSelectors;
    this._inputSelector = form.inputSelectors;
    this._submitButtonSelector = form.submitButtonSelectors;
    this._inputErrorClass = form.errorSelectors;

    this._validatedForm = formToValidate;
  }

  _showInputError(inputEl) {
    this._errorClassEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._errorClassEl.id);
    this._errorClassEl.textContent = inputEl.validationMessage;
    //this._errorClassEl.classList.add(someErrorClass)
  }

  _hideInputError(inputEl) {
    this._errorClassEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._errorClassEl.id);
    this._errorClassEl.textContent = "";
    //this._errorClassEl.classList.remove(someErrorClass)
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
    this._button = this._validatedForm.querySelector(".modal__button");
    this._button.classList.add("modal__button_disabled");
    this._button.disabled = true;
  }

  _enableButton() {
    this._button = this._validatedForm.querySelector(".modal__button");
    this._button.classList.remove("modal__button_disabled");
    this._button.disabled = false;
  }

  // _hasInvalidInput() {
  //   this._inputEl = [...document.querySelectorAll(".modal__input")];
  //   return !this._inputEl.every((input) => input.validity.valid);
  //   this._validity = this._inputEl.every((input) => {
  //     if (input.validity.valid) {
  //       this._enableButton();
  //     } else {
  //       this._disableButton();
  //     }
  //   });
  // }

  // _toggleButtonState() {
  //   if (this._hasInvalidInput()) {
  //     this._disableButton();
  //     return;
  //   }
  //   this._enableButton();
  // }

  _setEventListeners() {
    this._inputSelector.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        e.preventDefault();
        this._checkInputValidity(inputEl);
        //this._toggleButtonState();
        //this._hasInvalidInput();
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
