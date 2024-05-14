export default class Form {
  constructor(form, validatedForm) {
    this._formSelector = form.formSelector;
    this._inputSelector = form.formSelector;
    this._submitButtonSelector = form.submitButtonSelector;
    this._inputErrorClass = form.inputErrorClass;

    this._validatedForm = validatedForm;
  }

  _checkInputValidity() {
    if (!this._inputSelector.validity.valid) {
      console.log(`Input Invalid.`);
    }
  }

  _setEventListeners() {
    this._inputSelector.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        e.preventDefault();
        this._checkInputValidity();
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
