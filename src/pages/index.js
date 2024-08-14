import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  authorizationCode,
  validationConfig,
  addModalClassStg,
  editModalClassStg,
  avatarModalClassStg,
  previewModalClassStg,
  trashModalClassStg,
  profileNameStg,
  profileBioStg,
  globalVariable,
} from "../utils/constants.js";

/*---------------------------------------------------*/
/*                     Elements                      */
/*---------------------------------------------------*/

/*-- Add Modal --*/
const addModalForm = document.querySelector("#add-modal-form");
const addModalSubmitButton = addModalForm.querySelector(".modal__button");

/*-- Edit Modal --*/
const editModal = document.querySelector("#edit-modal");
const editModalForm = editModal.querySelector("#edit-modal-form");
const editModalSubmitButton = editModalForm.querySelector(".modal__button");

/*-- Profile Selectors --*/
const profileAvatarForm = document.querySelector("#profile-modal-form");
const profilePenIcon = document.querySelector(`#profile__avatar-pen-icon`);
const profileEditButton = document.querySelector(".profile__button-edit");
const profileAddButton = document.querySelector(".profile__button-add");
const avatarModalSubmitButton =
  profileAvatarForm.querySelector(".modal__button");

/*-- Trash Icon Selectors --*/
const trashModal = document.querySelector("#trash-modal");
const trashModalSubmitButton = trashModal.querySelector(".modal__button");

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleAvatarFormSubmit(formValues) {
  const profilePicObject = api.patchProfileAvatar(formValues.url);
  changeSubmitButton(avatarModalSubmitButton);
  profilePicObject.then((object) => {
    avatarPopup.handleAvatarChange(object.avatar);
  });
  avatarPopup.close();
  profileAvatarFormValidator.disableButton();
}

function handleProfileFormSubmit(formValues) {
  api.patchProfile(formValues.name, formValues.bio);
  changeSubmitButton(editModalSubmitButton);
  userInfo.setUserInfo(formValues.name, formValues.bio);
  profilePopup.close();
  editProfileFormValidator.disableButton();
}

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.url;
  const cardApiObject = api.postCards({ name, link });
  changeSubmitButton(addModalSubmitButton);
  cardApiObject.then((object) => {
    const element = createCard(object);
    section.addItem(element);
  });
  cardPopup.close();
}

function handleImageClick(data) {
  popupImg.open(data);
  popupImg.setEventListeners();
}

function handleConfirmModal(data) {
  trashModalSubmitButton.textContent = "Yes";
  trashConfirmPopup.open();
  trashConfirmPopup.setEventListeners(data);
}

function handleDeleteConfirmModal(title) {
  uniqueCards.then((cards) => {
    cards.forEach((card) => {
      if (card.name === title.textContent) {
        api.deleteCard(card._id);
        changeSubmitButton(trashModalSubmitButton);
      }
    });
  });

  trashConfirmPopup.close();
}

function handleLikeIconClick(data) {
  if (data.apiData.isLiked) {
    api.deleteCardLike(data.apiData._id);
    data.changeHeartIcon(data);
  } else {
    api.putCardLike(data.apiData._id);
    data.changeHeartIcon(data);
  }
}

/*---------------------------------------------------*/
/*                 Event Listeners                   */
/*---------------------------------------------------*/

profilePenIcon.addEventListener("click", () => {
  avatarModalSubmitButton.textContent = "Save";
  avatarPopup.open();
  profileAvatarFormValidator.disableButton();
  avatarPopup.setEventListeners();
});

profileEditButton.addEventListener("click", () => {
  editModalSubmitButton.textContent = "Save";
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputValues(currentUserInfo);
  profilePopup.open();
  editProfileFormValidator.disableButton();
});

profileAddButton.addEventListener("click", () => {
  addModalSubmitButton.textContent = "Create";
  cardPopup.open();
  addFormValidator.disableButton();
});

/*---------------------------------------------------*/
/*                     Functions                     */
/*---------------------------------------------------*/

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      altName: cardData.name,
      link: cardData.link,
      _id: cardData._id,
    },
    "#card-template",
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick
  );

  const tempCard = card.getView();
  card.setHeartIcon(cardData);
  return tempCard;
}

function getUniqueCards() {
  const cardArray = new Set();
  const promiseHolder = api.getCards();

  return promiseHolder.then((promiseResult) => {
    promiseResult.forEach((card) => {
      cardArray.add(card);
    });

    return cardArray;
  });
}

function changeSubmitButton(button) {
  button.textContent = "Saving . . .";
}

/*---------------------------------------------------*/
/*              UserInfo Constructor                 */
/*---------------------------------------------------*/

const userInfo = new UserInfo(profileNameStg, profileBioStg);

/*---------------------------------------------------*/
/*           FormValidator Constructor               */
/*---------------------------------------------------*/

const profileAvatarFormValidator = new FormValidator(
  validationConfig,
  profileAvatarForm
);
profileAvatarFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
  validationConfig,
  editModalForm
);
editProfileFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, addModalForm);
addFormValidator.enableValidation();

/*---------------------------------------------------*/
/*           PopupWithForm Constructor               */
/*---------------------------------------------------*/

const avatarPopup = new PopupWithForm(
  avatarModalClassStg,
  handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

const profilePopup = new PopupWithForm(
  editModalClassStg,
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(addModalClassStg, handleAddCardFormSubmit);
cardPopup.setEventListeners();

/*---------------------------------------------------*/
/*          PopupWithImage Constructor               */
/*---------------------------------------------------*/

const popupImg = new PopupWithImage(previewModalClassStg);

/*---------------------------------------------------*/
/*         PopupWithCofirm Constructor               */
/*---------------------------------------------------*/

const trashConfirmPopup = new PopupWithConfirm(
  trashModalClassStg,
  handleDeleteConfirmModal
);

/*---------------------------------------------------*/
/*                      Api                          */
/*---------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: authorizationCode,
  },
});

const profileApiObject = api.getProfile();

profileApiObject.then((data) => {
  userInfo.setUserInfo(data.name, data.about);
  avatarPopup.handleAvatarChange(data.avatar);
});

/*---------------------------------------------------*/
/*               Section Constructor                 */
/*---------------------------------------------------*/
// To get the size of cardArray outside the getUniqueCards function,
// you need to handle it asynchronously since getUniqueCards has
// asynchronous logic inside. You can return a promise from getUniqueCards
// and then handle it accordingly.
const uniqueCards = getUniqueCards();

const section = new Section(
  { items: uniqueCards, renderer: createCard },
  ".card__list"
);

section.renderItems();
