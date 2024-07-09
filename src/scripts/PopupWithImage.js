import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    this._popupPreviewImage = document.querySelector(`${popupSelector}-image`);
    this._popupPreviewCaption = document.querySelector(
      `${popupSelector}-title`
    );
  }

  open(data) {
    // set the image's src and alt
    this._popupPreviewImage.src = data.link;
    this._popupPreviewImage.alt = data.altName;

    // set the caption's textContent
    this._popupPreviewCaption.textContent = data.name;

    super.open();
  }
}
