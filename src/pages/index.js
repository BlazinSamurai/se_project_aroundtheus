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
  globalCards,
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
const trashModalCloseButton = trashModal.querySelector(".modal__close");
const trashButton = document.querySelector(".card__button-trash");
const trashModalSubmitButton = trashModal.querySelector(".modal__button");

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleAvatarFormSubmit(formValues) {
  const profilePicObject = profilePicApi.patchProfileAvatar(formValues.url);
  changeSubmitButton(avatarModalSubmitButton);
  profilePicObject.then((object) => {
    avatarPopup.handleAvatarChange(object.avatar);
  });
  avatarPopup.close();
  profileAvatarFormValidator.disableButton();
}

function handleProfileFormSubmit(formValues) {
  profileApi.patchProfile(formValues.name, formValues.bio);
  changeSubmitButton(editModalSubmitButton);
  userInfo.setUserInfo(formValues.name, formValues.bio);
  profilePopup.close();
  editProfileFormValidator.disableButton();
}

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.url;
  const cardApiObject = cardApi.postCards({ name, link });
  changeSubmitButton(addModalSubmitButton);
  cardApiObject.then((object) => {
    const section = new Section(
      { items: null, renderer: createCard },
      ".card__list"
    );
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
  trashConfirmPopup.displayCard(data);
}

function handleDeleteConfirmModal(title) {
  let cardID = getID(title);
  cardApi.deleteCard(cardID);
  changeSubmitButton(trashModalSubmitButton);
  trashConfirmPopup.close();
}

function handleLikeIconClick(data) {
  //putCardLike needs an id
  // console.log(data);
  const cardTitle = data.querySelector(".card__title");
  const likeButton = data.querySelector(".card__button-like");
  const cardID = getID(cardTitle);
  // console.log("Card like button:", likeButton, "Card id:", cardID);
  const putLikeResult = cardApi.putCardLike(cardID);
  putLikeResult.then((result) => {
    //console.log(result);
    if (result.isLiked) {
      likeButton.classList.add("card__button-like_active");
    }
  });
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
  const name = cardData.name;
  const altName = cardData.name;
  const link = cardData.link;
  const card = new Card(
    { name, altName, link },
    "#card-template",
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick
  );

  return card.getView();
}

function getID(data) {
  let cardID;
  globalCards.forEach((card) => {
    if (card.name === data.textContent) {
      cardID = card._id;
    }
  });
  return cardID;
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

// const trashIconPopup = new PopupWithForm(trashModalClassStg, () => {});

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

const profileApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/users/me",
  headers: {
    authorization: authorizationCode,
  },
});

const profileApiObject = profileApi.getProfile();

profileApiObject.then((data) => {
  userInfo.setUserInfo(data.name, data.about);
  avatarPopup.handleAvatarChange(data.avatar);
});

//https://around-api.en.tripleten-services.com/v1/users/me/avatar
const profilePicApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
  headers: {
    authorization: authorizationCode,
  },
});

const cardApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/cards",
  headers: {
    authorization: authorizationCode,
  },
});

const cardsApiObject = cardApi.getCards();

cardsApiObject.then((cards) => {
  const section = new Section(
    { items: cards, renderer: createCard },
    ".card__list"
  );
  section.renderItems();

  cards.forEach((card) => {
    globalCards.push(card);
    cardApi.postCards(card);
  });
});
