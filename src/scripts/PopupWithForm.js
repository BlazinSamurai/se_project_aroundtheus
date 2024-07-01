import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  // collects data from all the input fields and returns it as an object.
  // This data should then be passed to the submission handler as an argument
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");

    this._formValues = {};
    this._inputList.forEach((input) => {
      // the name attribute of each field will serve as a key in this object
      this._formValues[input.name] = input.value;
    });

    this._handleFormSubmit(this._formValues);
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  // setEventListeners() method of the PopupWithForm class should add a submit
  // event listener to the form and call the setEventListeners() method of the
  // parent class.
  setEventListeners() {
    this._popupForm.addEventListener("click", super.setEventListeners());
    this._popupForm.addEventListener("keydown", super.setEventListeners());
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this.close();
    });
  }
}
