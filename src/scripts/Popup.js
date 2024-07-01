export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(evt) {
    if (`#${evt.target.id}` === this._popupSelector) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._popupElement.addEventListener("keydown", () => {
      this.setEventListeners();
    });
    this._popupElement.addEventListener("click", () => {
      this.setEventListeners();
    });
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("keydown", () => {
      this.setEventListeners();
    });
    this._popupElement.removeEventListener("click", () => {
      this.setEventListeners();
    });
  }

  setEventListeners() {
    document.addEventListener("click", (e) => {
      this._handleOverlay(e);
    });
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
    document.removeEventListener("click", (e) => {
      this._handleOverlay(e);
    });
    document.removeEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }
}
