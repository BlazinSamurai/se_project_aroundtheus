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
const avatarPic = document.querySelector("#profile__avatar-pic");

/*-- Trash Icon Selectors --*/
const trashModal = document.querySelector("#trash-modal");
const trashModalSubmitButton = trashModal.querySelector(".modal__button");

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleAvatarFormSubmit(formValues) {
  api
    .patchProfileAvatar(formValues.url)
    .then((object) => {
      avatarPopup.setButtonText(true, avatarModalSubmitButton);
      userInfo.setAvatarPic(avatarPic, object.avatar);
      profileAvatarFormValidator.disableButton();
      avatarPopup.close();
      profileAvatarForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.setButtonText(false, avatarModalSubmitButton, "Save");
    });
}

function handleProfileFormSubmit(formValues) {
  api
    .patchProfile(formValues.name, formValues.bio)
    .then(() => {
      profilePopup.setButtonText(true, editModalSubmitButton);
      userInfo.setUserInfo(formValues.name, formValues.bio);
      editProfileFormValidator.disableButton();
      profilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profilePopup.setButtonText(false, editModalSubmitButton, "Save");
    });
}

function handleAddCardFormSubmit(formValues) {
  const name = formValues.title;
  const link = formValues.url;
  api
    .postCards({ name, link })
    .then((object) => {
      cardPopup.setButtonText(true, addModalSubmitButton);
      const element = createCard(object);
      section.addItem(element);
      cardPopup.close();
      addModalForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardPopup.setButtonText(false, addModalSubmitButton, "Create");
    });
}

function handleImageClick(data) {
  popupImg.open(data);
}

function handleConfirmModal(data) {
  trashConfirmPopup.open();
  trashConfirmPopup.setSubmitFunction(() => {
    api
      .deleteCard(data.apiData._id)
      .then(() => {
        cardPopup.setButtonText(true, trashModalSubmitButton);
        trashConfirmPopup.close();
        data.removeCard(data.cardElement);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardPopup.setButtonText(false, trashModalSubmitButton, "Yes");
      });
  });
}

function handleLikeIconClick(data) {
  if (data.apiData.isLiked) {
    api
      .deleteCardLike(data.apiData._id)
      .then(() => {
        data.changeHeartIcon(data);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .putCardLike(data.apiData._id)
      .then(() => {
        data.changeHeartIcon(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/*---------------------------------------------------*/
/*                 Event Listeners                   */
/*---------------------------------------------------*/

profilePenIcon.addEventListener("click", () => {
  avatarPopup.open();
  profileAvatarFormValidator.disableButton();
});

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputValues(currentUserInfo);
  profilePopup.open();
  editProfileFormValidator.disableButton();
});

profileAddButton.addEventListener("click", () => {
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

// function changeSubmitButton(button) {
//   button.textContent = "Saving . . .";
// }

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
popupImg.setEventListeners();

/*---------------------------------------------------*/
/*         PopupWithCofirm Constructor               */
/*---------------------------------------------------*/

const trashConfirmPopup = new PopupWithConfirm(
  trashModalClassStg,
  handleConfirmModal
);
trashConfirmPopup.setEventListeners();

/*---------------------------------------------------*/
/*                      Api                          */
/*---------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: authorizationCode,
    "Content-Type": "application/json",
  },
});

api
  .getProfile()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    avatarPic.src = data.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

/*---------------------------------------------------*/
/*               Section Constructor                 */
/*---------------------------------------------------*/

const section = new Section(
  { items: null, renderer: createCard },
  ".card__list"
);

api.getCards().then((cards) => {
  section.renderItems(cards);
});
