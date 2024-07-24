import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  authorizationCode,
  cardsData,
  validationConfig,
  addModalClassStg,
  editModalClassStg,
  previewModalClassStg,
  profileNameStg,
  profileBioStg,
} from "../utils/constants.js";

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

const items = cardsData;
const section = new Section({ items, renderer: createCard }, ".card__list");
//this is where the cards are created and then added to the DOM
// section.renderItems();

/*---------------------------------------------------*/
/*                     Functions                     */
/*---------------------------------------------------*/

function createCard(cardData) {
  // console.log("createCard()");
  const name = cardData.name;
  const altName = cardData.name;
  const link = cardData.link;
  const card = new Card(
    { name, altName, link },
    "#card-template",
    handleImageClick
  );
  return card.getView();
}

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues.name, formValues.bio);
  profileApi.setProfileInfo({ name: formValues.name, bio: formValues.bio });
  profileApi
    .patchProfile()
    .then((updatedProfile) => {
      console.log("Profile updated successfully:", updatedProfile);
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
  profilePopup.close();
  editProfileFormValidator.disableButton();
}

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const altName = formValues.title;
  const link = formValues.url;
  // const cardElement = createCard({ name, altName, link });
  //createCard({ name, altName, link });
  cardApi.postCards({ name, link });
  cardPopup.close();
}

function handleImageClick(data) {
  console.log("index.js/handleImageClick()");
  popupImg.open(data);
}

/*---------------------------------------------------*/
/*                 Event Listeners                   */
/*---------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  //const currentUserInfo = userInfo.getUserInfo();
  const currentUserInfo = profileApi.getProfileInfo();
  profilePopup.setInputValues(currentUserInfo);
  profilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  cardPopup.open();
  addFormValidator.disableButton();
});

/*---------------------------------------------------*/
/*                 Constructor                       */
/*---------------------------------------------------*/

const userInfo = new UserInfo(profileNameStg, profileBioStg);

const editProfileFormValidator = new FormValidator(
  validationConfig,
  editModalForm
);
editProfileFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, addModalForm);
addFormValidator.enableValidation();

const profilePopup = new PopupWithForm(
  editModalClassStg,
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(addModalClassStg, handleAddCardFormSubmit);
cardPopup.setEventListeners();

const popupImg = new PopupWithImage(previewModalClassStg);
popupImg.setEventListeners();

const profileApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/users/me",
  headers: {
    authorization: authorizationCode,
  },
});

profileApi.getProfile();

const cardApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/cards",
  headers: {
    authorization: authorizationCode,
  },
});

cardsData.forEach((card) => {
  cardApi.postCards(card);
});

// PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
