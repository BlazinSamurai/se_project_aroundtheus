import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDelete) {
    super({ popupSelector });

    this._popupSelector = popupSelector;
    this._handleDelete = handleDelete;
  }

  _removeCard(card) {
    card.remove();
    card = null;
  }

  setEventListeners(data) {
    this.trashModal = document.querySelector(`${this._popupSelector}`);
    this.trashModalSubmitButton = this.trashModal.querySelector(
      "#modal-button-trash"
    );

    this.cardTitle = data.cardElement.querySelector(".card__title");

    this.trashModal.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDelete(this.cardTitle);
      this._removeCard(data.cardElement);
    });
  }
}
