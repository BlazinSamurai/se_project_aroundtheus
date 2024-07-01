import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidation.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";

const cardsData = [
  {
    name: "Lago di Braies",
    altName: "Lago di Braise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
  {
    name: "Vanoise National Park",
    altName: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    altName: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    altName: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    altName: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    altName: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

/*---------------------------------------------------*/
/*                     Elements                      */
/*---------------------------------------------------*/

/*-- Add Modal --*/
const addModal = document.querySelector("#add-modal");
const addModalForm = document.querySelector("#add-modal-form");
const addModalTitle = addModalForm.querySelector("#add-modal-title");
const addModalURL = addModalForm.querySelector("#add-modal-url");
const addModalCloseButton = addModal.querySelector(".modal__close");

/*-- Card Selector --*/
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardElement = cardTemplate.cloneNode(true);
const cardListEl = document.querySelector(".card__list");
const cardImageEl = cardElement.querySelectorAll(".card__image");

/*-- Edit Modal --*/
const editModal = document.querySelector("#edit-modal");
const editModalForm = editModal.querySelector("#edit-modal-form");
const editModalName = editModal.querySelector("#edit-modal-name");
const editModalBio = editModal.querySelector("#edit-modal-bio");
const editModalCloseButton = editModal.querySelector(".modal__close");

/*-- Preview Modal --*/
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = document.querySelector("#preview-modal-button");
const previewTitleEl = previewModal.querySelector("#modal-preview-title");
const previewImageEl = previewModal.querySelector(".modal__preview-image");

/*-- Profile Selectors --*/
const profileEditButton = document.querySelector(".profile__button-edit");
const profileAddButton = document.querySelector(".profile__button-add");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

/*-- Config --*/
const validationConfig = {
  formSelector: "modal__form",
  inputSelector: "modal__input",
  submitButtonSelector: "modal__button",
  errorClass: "modal__input-error",
};

const addModalClassStg = "#add-modal";
const editModalClassStg = "#edit-modal";
const previewModalClassStg = "#preview-modal";

/*---------------------------------------------------*/
/*                     Functions                     */
/*---------------------------------------------------*/

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function createPopupImg(data) {
  const popupImg = new PopupWithImage(data);
  return popupImg;
}

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleProfileFormSubmit() {
  profilePopupForm.setEventListeners();
}

function handleAddCardFormSubmit() {
  cardPopupForm.setEventListeners();
  addFormValidator.disableButton();
}

function handleImageClick(data) {
  const newPopupImg = createPopupImg(previewModalClassStg);
  newPopupImg.open(data);
}

/*---------------------------------------------------*/
/*                 Event Listeners                   */
/*---------------------------------------------------*/

editModalForm.addEventListener("submit", handleProfileFormSubmit);

addModalForm.addEventListener("submit", handleAddCardFormSubmit);

editModalCloseButton.addEventListener("click", () => {
  profilePopupForm.close();
});

profileAddButton.addEventListener("click", () => {
  cardPopupForm.open();
  addFormValidator.disableButton();
});

addModalCloseButton.addEventListener("click", () => {
  cardPopupForm.close();
});

previewModalCloseButton.addEventListener("click", () => {
  const popupImg = new PopupWithImage(previewModalClassStg);
  popupImg.close();
});

profileEditButton.addEventListener("click", () => {
  const userInfor = new UserInfo(profileName, profileBio);
  userInfor.setUserInfo();
  profilePopupForm.open();
  editProfileFormValidator.disableButton();
});

/*---------------------------------------------------*/
/*                 Card Constructor                  */
/*---------------------------------------------------*/

cardsData.forEach((data) => {
  const cardElement = createCard(data);
  cardListEl.prepend(cardElement);
});

/*---------------------------------------------------*/
/*                 Form Constructor                  */
/*---------------------------------------------------*/

const editProfileFormValidator = new FormValidator(
  validationConfig,
  editModalForm
);
editProfileFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, addModalForm);
addFormValidator.enableValidation();

const profilePopupForm = new PopupWithForm(
  editModalClassStg,
  handleProfileFormSubmit
);

const cardPopupForm = new PopupWithForm(
  addModalClassStg,
  handleAddCardFormSubmit
);
