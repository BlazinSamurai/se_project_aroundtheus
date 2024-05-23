/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
The Card class is intended to replace the functionality of you
'getCardElement' function from the previous project.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

export default class Card {
  constructor({ name, altName, link }, cardSelector, handleImageClick) {
    this._data = { name, altName, link };
    this._name = name;
    this._altName = altName;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setCardData() {
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
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

    this._cardElement.addEventListener("click", () => {
      this._handleImageClick(this);
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
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__section")
      .cloneNode(true);

    this._setCardData();

    this._setEventListener();

    return this._cardElement;
  }
}
