import Card from "../components/Card.js";
import Form from "../components/FormValidation.js";

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
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardElement = cardTemplate.cloneNode(true);
const cardImageEl = cardElement.querySelector(".card__image");

/*-- Edit Modal --*/
const editModal = document.querySelector("#edit-modal");
const editModalForm = editModal.querySelector("#edit-modal-form");
const editModalName = editModal.querySelector("#edit-modal-name");
const editModalBio = editModal.querySelector("#edit-modal-bio");
const editModalCloseButton = editModal.querySelector(".modal__close");

/*-- Preview Modal --*/
const previewImageModal = document.querySelector(".preview-Image-Modal");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = document.querySelector("#preview-modal-button");
const previewImageEl = previewModal.querySelector(".modal__preview-image");
const previewTitleEl = previewModal.querySelector("#modal-preview-title");

/*-- Profile Selectors --*/
const profileEditButton = document.querySelector(".profile__button-edit");
const profileAddButton = document.querySelector(".profile__button-add");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

/*-- Config --*/
const formSelectors = document.querySelectorAll(".modal__form");
const inputSelectors = document.querySelectorAll(".modal__input");
const submitButtonSelectors = document.querySelectorAll(".modal__button");
const errorSelectors = document.querySelectorAll(".modal__input-error");

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
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  listEl.prepend(cardElement);
}

function fillProfileForm() {
  editModalName.value = profileName.textContent;
  editModalBio.value = profileBio.textContent;
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

function handleImageClick() {
  cardsData.forEach((data) => {
    // cardImageEl.addEventListener("click", () => {
    //   previewImageEl.src = data.link;
    //   previewImageEl.alt = data.altName;
    //   previewTitleEl.textContent = data.name;
    //   openModal(previewModal);
    // });
    console.log(data.name);
    console.log(data.link);
  });
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
  openModal(editModal);
});

cardsData.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
});

const editProfileFormValidator = new Form(
  { formSelectors, inputSelectors, submitButtonSelectors, errorSelectors },
  editModal
);
editProfileFormValidator.enableValidation();

const addFormValidator = new Form(
  { formSelectors, inputSelectors, submitButtonSelectors, errorSelectors },
  addModal
);
addFormValidator.enableValidation();
