const initialCards = [
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

const profileEditButton = document.querySelector(".profile__button-edit");
const profileAddButton = document.querySelector(".profile__button-add");
const editModal = document.querySelector("#edit-modal");
const addModal = document.querySelector("#add-modal");
const previewImageModal = document.querySelector(".preview-Image-Modal");
const editModalCloseButton = editModal.querySelector(".modal__close");
const editModalForm = editModal.querySelector("#edit-modal-form");
const addModalForm = document.querySelector("#add-modal-form");
const addModalCloseButton = addModal.querySelector(".modal__close");
const editModalName = editModal.querySelector("#modal-input-top");
const editModalBio = editModal.querySelector("#modal-input-bottom");
const addModalTitle = addModal.querySelector("#modal-input-top-add");
const addModalURL = addModal.querySelector("#modal-input-bottom-add");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

editModalForm.addEventListener("submit", handleProfileFormSubmit);
addModalForm.addEventListener("submit", handleAddCardFormSubmit);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, ListEl) {
  const cardElement = getCardElement(cardData);
  ListEl.prepend(cardElement);
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
  closeModal(addModal);
}

profileEditButton.addEventListener("click", () => {
  editModal.classList.add("modal_opened");
});

editModalCloseButton.addEventListener("click", () => {
  editModal.classList.remove("modal_opened");
});

profileAddButton.addEventListener("click", () => {
  addModal.classList.add("modal_opened");
});

addModalCloseButton.addEventListener("click", () => {
  addModal.classList.remove("modal_opened");
});

profileEditButton.addEventListener("click", () => {
  editModalName.value = profileName.textContent;
  editModalBio.value = profileBio.textContent;
});

profileAddButton.addEventListener("click", () => {
  addModalTitle.value;
  addModalURL.value;
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__button-like");
  const cardTrashButton = cardElement.querySelector(".card__button-trash");
  const previewImageEl = document.querySelector(".modal__preview-image");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__button-like_active");
  });

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.altName;

  // for third modal: add click listener to the cardImageEl
  //  use openModal with previewImageModal, modal you need to add to your html
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = cardData.link;
    previewImageEl.textContent = cardData.name;
    previewImageEl.alt = cardData.altName;
    previewImageEl.classList.add("modal_opened");
  });

  cardTrashButton.addEventListener("click", () => {
    cardElement.remove(cardData);
  });

  return cardElement;
}
