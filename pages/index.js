import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";

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

/*-- Global Variables --*/
let currentModal;

/*---------------------------------------------------*/
/*                     Functions                     */
/*---------------------------------------------------*/

function openModal(modal) {
  currentModal = modal;
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleOverlay);
}

function renderCard(cardData, listEl) {
  const cardElement = createCard(cardData);
  listEl.prepend(cardElement);
}

function fillProfileForm() {
  editModalName.value = profileName.textContent;
  editModalBio.value = profileBio.textContent;
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

/*---------------------------------------------------*/
/*                 Event Handlers                    */
/*---------------------------------------------------*/

function handleEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(currentModal);
  }
}

function handleOverlay(evt) {
  if (evt.target.id === currentModal.id) {
    closeModal(currentModal);
  }
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = editModalName.value;
  profileBio.textContent = editModalBio.value;
  closeModal(editModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = addModalTitle.value;
  const altName = addModalTitle.value;
  const link = addModalURL.value;
  renderCard({ name, altName, link }, cardListEl);
  addModalForm.reset();
  closeModal(addModal);
}

function handleImageClick(data) {
  previewImageEl.src = data.link;
  previewTitleEl.textContent = data.name;
  previewImageEl.alt = data.altName;
  openModal(previewModal);
}

/*---------------------------------------------------*/
/*                 Event Listeners                   */
/*---------------------------------------------------*/

editModalForm.addEventListener("submit", handleProfileFormSubmit);

addModalForm.addEventListener("submit", handleAddCardFormSubmit);

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

profileAddButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  openModal(addModal);
});

addModalCloseButton.addEventListener("click", () => {
  closeModal(addModal);
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  editProfileFormValidator.disableButton();
  openModal(editModal);
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
