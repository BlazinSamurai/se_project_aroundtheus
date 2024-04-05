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
const editModalName = editModal.querySelector("#edit-modal-name");
const editModalBio = editModal.querySelector("#edit-modal-bio");
const editModalNameError = editModal.querySelector("#edit-modal-name-error");
const editModalBioError = editModal.querySelector("#edit-modal-bio-error");
const addModalTitle = addModal.querySelector("#add-modal-title");
const addModalURL = addModal.querySelector("#add-modal-url");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = document.querySelector("#preview-modal-button");

let editButtonClick = false;
let addButtonClick = false;
let previewModalClick = false;

editModalForm.addEventListener("submit", handleProfileFormSubmit);
addModalForm.addEventListener("submit", handleAddCardFormSubmit);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  addModalForm.reset();
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, listEl) {
  const cardElement = getCardElement(cardData);
  listEl.prepend(cardElement);
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

function fillProfileForm() {
  editModalName.value = profileName.textContent;
  editModalBio.value = profileBio.textContent;
}

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closeModal(editModal);
    closeModal(addModal);
    closeModal(previewModal);
  }
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(addModal);
  addButtonClick = true;
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
  editButtonClick = true;
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__button-like");
  const cardTrashButton = cardElement.querySelector(".card__button-trash");
  const previewImageEl = previewModal.querySelector(".modal__preview-image");
  const previewTitleEl = previewModal.querySelector("#modal-preview-title");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__button-like_active");
  });

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.altName;

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = cardData.link;
    previewImageEl.alt = cardData.altName;
    previewTitleEl.textContent = cardData.name;
    openModal(previewModal);
    previewModalClick = true;
  });

  cardTrashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

document.addEventListener("click", function (evt) {
  const openedModal = document.querySelector(".modal_opened");
  if (evt.target === openedModal) {
    closeModal(editModal);
    closeModal(addModal);
    closeModal(previewModal);
  }
});
