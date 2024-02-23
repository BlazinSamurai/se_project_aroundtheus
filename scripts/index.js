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

/*
 * You’ll implement the opening and closing of the modal box.
 * The modal box must be opened once the user clicks on the "Edit" button,
 * and be closed upon clicking on the close button in the upper right
 * corner. Use the addEventListener() method to detect when the user
 * clicks on these buttons. Save your JS in the /scripts folder inside
 * the project.
 */

let profileEditButton = document.querySelector(".profile__button-edit");
let modalCloseButton = document.querySelector(".modal");

function openModal() {
  modalCloseButton.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

function closeModal() {
  modalCloseButton.classList.remove("modal_opened");
}

modalCloseButton.addEventListener("click", closeModal);
