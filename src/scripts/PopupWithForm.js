import Popup from "./Popup";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("some popup form class");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    // calling close() from the parent class(Popup.js)
    super.close();
  }
}

/*
index.js

const newCardPopup = new PopupWithForm("popup Class", () => {});
newCardPopup.open();

newCardPopup.close();
*/
