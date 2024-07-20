export const cardsData = [
  {
    name: "Lago di Braies",
    altName: "Lago di Braise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
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

export const validationConfig = {
  formSelector: "modal__form",
  inputSelector: "modal__input",
  submitButtonSelector: "modal__button",
  errorClass: "modal__input-error",
};

export const addModalClassStg = "#add-modal";
export const editModalClassStg = "#edit-modal";
export const previewModalClassStg = "#preview-modal";
export const profileNameStg = ".profile__name";
export const profileBioStg = ".profile__bio";

export const authorizationCode = "c430f938-707d-41ce-9931-5e6195b9093a";

// postCards(cards) {
//   cards.forEach((card) => {
//     return fetch(this._baseUrl, {
//       method: "Post",
//       headers: {
//         authorization: this._headers.authorization,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: card.name,
//         link: card.link,
//       }),
//     })
//       .then((res) => {
//         if (res.ok) return res.json();
//         return Promise.reject(`Error: ${res.status}`);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   });
// }

// getCards() {
//   return fetch(this._baseUrl, {
//     method: "GET",
//     headers: {
//       authorization: this._headers.authorization,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       if (res.ok) return res.json();
//       return Promise.reject(`Error: ${res.status}`);
//     })
//     .then((results) => {
//       results.forEach((result) => {
//         console.log(result);
//         this._cardsID.push(result._id);
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

// deleteCards() {
//   //IDs.forEach((ID) => {
//   //console.log(this._baseUrl + ID);
//   return fetch(this._baseUrl, {
//     method: "DELETE",
//     headers: {
//       authorization: this._headers.authorization,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       if (res.ok) return res.json();
//       return Promise.reject(`Error: ${res.status}`);
//     })
//     .then((results) => {
//       console.log(results);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   //});
// }
