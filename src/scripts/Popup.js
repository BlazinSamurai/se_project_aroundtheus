export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      //closeModal(currentModal);
      this._popupElement.close();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.id === currentModal.id) {
      //closeModal(currentModal);
      this._popupElement.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this.setEventListeners);
    this._popupElement.addEventListener("mousedown", this.setEventListeners);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.setEventListeners);
    this._popupElement.removerEventListener(
      "mousedown",
      this.setEventListeners
    );
  }

  setEventListeners() {
    this._handleEscClose();
    this._handleOverlay();

    const closeButtonSelector =
      this._popupElement.querySelector(".modal__close");

    closeButtonSelector.addEventListener("click", this.close());
  }
}
