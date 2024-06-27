export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._popupElement.addEventListener("keypress", () => {
      this.setEventListeners();
    });
    this._popupElement.addEventListener("click", () => {
      this.setEventListeners();
    });
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  setEventListeners() {
    const closeButtonSelector = document.querySelector(".modal__close");
    closeButtonSelector.addEventListener("click", this.close());

    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }
}
