export default class Form {
  /*
  The first parameter is a settings object that stores selectors and form classes,
  and the second one takes a form element to be validated
  */
  constructor(form, validatedForm) {
    this._form = form;
    this._validatedForm = validatedForm;

    console.log(validatedForm.id);

    this._formSelector = form.formSelector;
    this._inputSelector = form.inputSelector;
    this._submitButtonSelector = form.submitButtonSelector;
    this._inactiveButtonClass = form.inactiveButtonClass;
    this._inputErrorClass = form.inputErrorClass;

    console.log(`this._inactiveButtonClass: ${this._inactiveButtonClass}`);
  }

  _showInputError(inputEl) {
    this._errorMessage = this._validatedForm.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(inputErrorClass);
    this._errorMessage.textContent = inputEl.validationMessage;
    this._errorMessage.classList.add(errorClass);
  }

  _hideInputError(inputEl) {
    this._errorMessageEl = this._validatedForm.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl, inputEl.validationMessage);
    }
    this._hideInputError(inputEl);
  }

  // _hasInvalidInput(inputEl) {
  //   return !inputEl.every((input) => input.validity.valid);
  // }

  _hasInvalidInput() {
    return this._inputEls.some((input) => !input.validity.valid);
  }

  // _toggleButtonState(inputEl) {
  //   if (this._hasInvalidInput(inputEl)) {
  //     this._enableButton();
  //   }
  //   this._disableButton();
  // }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._enableButton();
    }
    this._disableButton();
  }

  _enableButton() {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
  }

  _disableButton() {
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  // _setEventListeners(inputEl) {
  //   this._inputEls = [...inputEl.querySelectorAll(this._inputSelector)];
  //   this._submitButtonSelector = inputEl.querySelector(submitButtonSelector);
  //   this._inputEls.forEach((input) => {
  //     input.addEventListener("input", (e) => {
  //       this._checkInputValidity(inputEl);
  //       this._toggleButtonState(inputEl);
  //     });
  //   });
  // }

  _setEventListeners() {
    console.log(this);
    console.log(this._formSelector);
    console.log(this._inputSelector);
    this._inputEls = [
      ...this._validatedForm.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._validatedForm.querySelector(
      this._submitButtonSelector
    );

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    // this._formEls = [...document.querySelectorAll(this._formSelector)];
    // console.log(this);
    // this._formEls.forEach((formEl) => {
    //   formEl.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //   });

    //   this._setEventListeners(this._formEls);
    // });

    this._validatedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._disableButton();
    });

    this._setEventListeners();
    this._toggleButtonState();
  }
}
