import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues(e) {
    e.preventDefault();

    this._inputList = this._popupElement.querySelectorAll(".modal__input");

    // needs to collect data from all the input fields
    this._formValues = {};
    this._inputList.forEach((input) => {
      // the name attribute of each field will serve as a key in this object
      this._formValues[input.name] = input.value;
    });

    // and returns it as an object
    return this._formValues;
  }

  close() {
    this._popupForm.reset();
    // calling close() from the parent class(Popup.js)
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      // this._popupElement.reset();
      super.setEventListeners();
    });
  }

  generatePopupForm() {
    // this._popupForm = this._popupElement
    //   .querySelector(this._popupSelector)
    //   .content.querySelector(".modal__form")
    //   .cloneNode(true);

    this.setEventListeners();

    return this._popupForm;
  }
}

/*
index.js

const newCardPopup = new PopupWithForm("popup Class", () => {});
newCardPopup.open();

newCardPopup.close();
*/
