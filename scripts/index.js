const initialCards = [
  {
    name: "Yosemite Valley",
    altName: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    altName: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    altName: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    altName: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    altName: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    altName: "Lago di Braise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

const profileEditButton = document.querySelector(".profile__button-edit");
const profileModal = document.querySelector(".modal");
const profileModalCloseButton = profileModal.querySelector(".modal__close");
const modalForm = profileModal.querySelector(".modal__form");
const modalInputName = profileModal.querySelector("#modal-input-top");
const modalInputBio = profileModal.querySelector("#modal-input-bottom");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function closeModal() {
  profileModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  let cardImageEl = cardElement.querySelector(".card__image");
  let cardTitleEl = cardElement.querySelector(".card__title");
  let cardAltNameEl = cardElement.querySelector(".card__image");
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardAltNameEl.alt = cardData.altName;
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  profileModal.classList.add("modal_opened");
  modalInputName.value = profileName.textContent;
  modalInputBio.value = profileBio.textContent;
});

profileModalCloseButton.addEventListener("click", closeModal);

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = modalInputName.value;
  profileBio.textContent = modalInputBio.value;
  closeModal();
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
