export default class Card {
  constructor(
    { name, altName, link },
    cardSelector,
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick
  ) {
    this.name = name;
    this.altName = altName;
    this.link = link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleConfirmModal = handleConfirmModal;
    this._handleLikeIconClick = handleLikeIconClick;
  }

  _setCardData() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.altName;
    this._cardTitle.textContent = this.name;

    return this.cardElement;
  }

  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIconClick(this.cardElement);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleConfirmModal(this.cardElement);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  getView() {
    this.cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__section")
      .cloneNode(true);
    this._likeButton = this.cardElement.querySelector(".card__button-like");
    this._trashButton = this.cardElement.querySelector(".card__button-trash");
    this._cardImage = this.cardElement.querySelector(".card__image");
    this._cardTitle = this.cardElement.querySelector(".card__title");

    this._setCardData();
    this._setEventListener();

    return this.cardElement;
  }
}
