export default class Form {
  constructor(form, validatedForm) {
    this._formSelector = form.formSelectors;
    this._inputSelector = form.inputSelectors;
    this._submitButtonSelector = form.submitButtonSelectors;
    this._inputErrorClass = form.errorSelectors;

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
