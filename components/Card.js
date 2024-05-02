/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
The Card class is intended to replace the functionality of you
'getCardElement' function from the previous project.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

export default class Card {
  constructor({ name, altName, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._altName = altName;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListener() {
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("mousedown", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__button-trash")
      .addEventListener("mousedown", () => {
        this._handleDeleteButton();
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button-like")
      .classList.toggle("card__button-like_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    // get the card view?
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__section")
      .cloneNode(true);

    console.log(`In getView(). "this._cardElement": ${this._cardElement}`);
    console.log(`In getView(). "this": ${this}`);

    // set event setEventListeners
    this._setEventListener();

    // return the card
    return this._cardElement;
  }
}
