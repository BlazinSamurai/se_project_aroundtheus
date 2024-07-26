import "./index.css";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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

/*-- Edit Modal --*/
const editModal = document.querySelector("#edit-modal");
const editModalForm = editModal.querySelector("#edit-modal-form");

/*-- Profile Selectors --*/
const profileAvatarForm = document.querySelector("#profile-modal-form");
const profileAvatarInput = profileAvatarForm.querySelector(
  "#profile-modal-avatar"
);
const profileAvatarSelector = document.querySelector(
  "#profile__avatar-pen-icon"
);
const profileEditButton = document.querySelector(".profile__button-edit");
const profileAddButton = document.querySelector(".profile__button-add");

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues.name, formValues.bio);
  profileApi.setProfileInfo({ name: formValues.name, bio: formValues.bio });
  profileApi.patchProfile().catch((err) => {
    console.error("Error updating profile:", err);
  });
  profilePopup.close();
  editProfileFormValidator.disableButton();
}

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.url;
  cardApi.postCards({ name, link });
  cardPopup.close();
}

/*---------------------------------------------------*/
/*                 Event Listeners                   */
/*---------------------------------------------------*/

profileAvatarForm.addEventListener("submit", () => {
  const avatarInput = profileAvatarInput.value;
  profilePicApi.patchProfileAvatar(avatarInput);
  profilePicApi.close();
});

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = profileApi.getProfileInfo();
  profileApi.setCurrentModal(editModal);
  profilePopup.setInputValues(currentUserInfo);
  profileApi.open();
});

profileAddButton.addEventListener("click", () => {
  cardApi.setCurrentModal(addModal);
  cardApi.open();
  addFormValidator.disableButton();
});

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
popupImg.setEventListeners();

/*---------------------------------------------------*/
/*                      Api                          */
/*---------------------------------------------------*/

const profileApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/users/me",
  headers: {
    authorization: authorizationCode,
  },
});

profileApi.getProfile();

const profilePicApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
  headers: {
    authorization: authorizationCode,
  },
});

profilePicApi.setEventListeners(profileAvatarSelector);

const cardApi = new Api({
  // 'https://around-api.en.tripleten-services.com/v1/cards'
  baseUrl: "https://around-api.en.tripleten-services.com/v1/cards",
  headers: {
    authorization: authorizationCode,
  },
});

cardApi.getCards();

// cardsData.forEach((card) => {
//   cardApi.postCards(card);
// });
//cardApi.handleCardOperations();
