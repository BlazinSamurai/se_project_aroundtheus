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
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__button-like_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setCardData() {
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._altName;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }

  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._cardElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__section")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__button-like");
    this._trashButton = this._cardElement.querySelector(".card__button-trash");

    this._setCardData();
    this._setEventListener();

    return this._cardElement;
  }
}
