export default class Form {
  constructor(form, validatedForm) {
    this._form = form;
    this._validatedForm = validatedForm;

    this._formSelector = form.formSelector;
    this._inputSelector = form.inputSelector;
    this._submitButtonSelector = form.submitButtonSelector;
    // this selector is null cause it is not used anywhere in index.html
    // this._inactiveButtonClass = form.inactiveButtonClass;
    this._inputErrorClass = form.inputErrorClass;
  }

  _disableButton() {
    this._inactiveButtonClass = this._submitButtonSelector.classlist.add(
      ".modal__button_disabled"
    );
    //this._submitButtonSelector.disabled = true;
  }

  enableValidation() {
    this._validatedForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._disableButton();
  }
}
