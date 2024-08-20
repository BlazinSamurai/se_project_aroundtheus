export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;

    this._popupElement = document.querySelector(popupSelector);
    this._closePopupButton = this._popupElement.querySelector(".modal__close");

    // Define the event handlers separately
    this._handleOverlayClick = (e) => this._handleOverlay(e);
    this._handleDocumentKeydown = (e) => this._handleEscClose(e);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.id === this._popupElement.id) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("click", this._handleOverlayClick, true);
    document.addEventListener("keydown", this._handleDocumentKeydown, false);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("click", this._handleOverlayClick, true);
    document.removeEventListener("keydown", this._handleDocumentKeydown, false);
  }

  // click event listener to the close icon of the popup.
  // The modal window should also close when users click
  // on the shaded area around the form
  setEventListeners() {
    this._closePopupButton.addEventListener("click", () => {
      this.close();
    });
  }
}
