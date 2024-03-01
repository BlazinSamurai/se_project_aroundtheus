const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

let profileEditButton = document.querySelector(".profile__button-edit");
let modal = document.querySelector(".modal");
let modalCloseButton = modal.querySelector(".modal__close");
let modalSaveButton = modal.querySelector(".modal__button");
let modalForm = modal.querySelector(".modal__form");
let modalInputName = modal.querySelector(".modal__input-top");
let modalInputBio = modal.querySelector(".modal__input-bottom");
let profileName = document.querySelector(".profile__name");
let profileBio = document.querySelector(".profile__bio");
let cardListEl = document.querySelector(".card__list");
let cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function close() {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImageEl = cardElement.querySelector(".card__image");
  let cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  modal.classList.add("modal_opened");

  modal
    .querySelector(".modal__input-top")
    .setAttribute("placeholder", profileName.textContent);
  modal
    .querySelector(".modal__input-bottom")
    .setAttribute("placeholder", profileBio.textContent);
});

modalCloseButton.addEventListener("click", close());

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = modalInputName.value;
  profileBio.textContent = modalInputBio.value;
  close();
});

initialCards.forEach((cardData) => {
  let cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
