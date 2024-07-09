import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidation.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";
import { cardsData } from "./utils/constants.js";
import { validationConfig } from "./utils/constants.js";

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

/*-- Class Strings --*/
const addModalClassStg = "#add-modal";
const editModalClassStg = "#edit-modal";
const previewModalClassStg = "#preview-modal";

const items = cardsData;
const section = new Section({ items, renderer: createCard }, ".card__list");
section.renderItems();

/*---------------------------------------------------*/
/*                     Functions                     */
/*---------------------------------------------------*/

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues.name, formValues.bio);
  profilePopup.close();
  editProfileFormValidator.disableButton();
}

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const altName = formValues.title;
  const link = formValues.url;
  const cardElement = createCard({ name, altName, link });
  section.addItem(cardElement);
  cardPopup.close();
  addFormValidator.disableButton();
}

function handleImageClick(data) {
  popupImg.open(data);
}

/*---------------------------------------------------*/
/*                 Event Listeners                   */
/*---------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.open();
  editModalName.value = currentUserInfo.name;
  editModalBio.value = currentUserInfo.bio;
});

profileAddButton.addEventListener("click", () => {
  cardPopup.open();
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

const userInfo = new UserInfo(profileName, profileBio);

const profilePopup = new PopupWithForm(
  editModalClassStg,
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(addModalClassStg, handleAddCardFormSubmit);
cardPopup.setEventListeners();

const popupImg = new PopupWithImage(previewModalClassStg);
popupImg.setEventListeners();
