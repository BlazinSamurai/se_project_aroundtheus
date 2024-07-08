import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(data) {
    const popupPreviewImage = document.querySelector(".modal__preview-image");

    // set the image's src and alt
    popupPreviewImage.src = data.link;
    popupPreviewImage.alt = data.altName;

    // set the caption's textContent
    popupPreviewImage.value = data.name;

    super.open();
  }
}
