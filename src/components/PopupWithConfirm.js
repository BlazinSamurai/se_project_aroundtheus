import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDelete) {
    super({ popupSelector });

    this._popupSelector = popupSelector;
    this._handleDelete = handleDelete;
  }

  // you will have to create the setEventListener method to get the submit
  // event of this modal to delete it only after the user confirms it
  // setEventListeners(data) {}

  _removeCard(card) {
    card.remove();
    card = null;
  }

  displayCard(data) {
    //console.log("Data:", data);
    //console.log("popupWithConfirm popupSelector:", this._popupSelector);
    this.trashModal = document.querySelector(`${this._popupSelector}`);
    this.trashModalSubmitButton = this.trashModal.querySelector(
      "#modal-button-trash"
    );

    this.cardTitle = data.querySelector(".card__title");

    //work with "click" event but not a "submit" event
    this.trashModalSubmitButton.addEventListener("click", (e) => {
      e.preventDefault();
      //console.log(this.cardTitle);
      this._handleDelete(this.cardTitle);
      this._removeCard(data);
    });
  }
}
