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
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    }
  }

  _setEventListeners() {
    this._inputSelector.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        e.preventDefault();
        this._checkInputValidity(inputEl);
        //this._toggleButtonState();
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
