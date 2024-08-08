export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    //   this.cardElement = document
    //     .querySelector("#card-template")
    //     .content.querySelector(".card__section")
    //     .cloneNode(true);

    //   this._avatarElement = document.querySelector(".profile__avatar");
    //   this._nameElement = document.querySelector(".profile__name");
    //   this._bioElement = document.querySelector(".profile__bio");
    //   this.previewElement = document.querySelector("#preview-modal");

    //   Ensure context binding for non-arrow non-promise specific case DONT USE
    //   this.handleCardOperations = this.handleCardOperations.bind(this); DONT USE

    //   Define the event handlers separately
    //   this._handleOverlayClick = (e) => this._handleOverlay(e);
    //   this._handleDocumentKeydown = (e) => this._handleEscClose(e);

    //   this.container = document.querySelector(".card__list");

    //   this._modalButtonContent = [];
    //   this._tempCardElement = [];

    //   this._currentModal;
    //   this._name;
    //   this._bio;
  }

  /*---------------------------------------------------*/
  /*         Profile Picture Api functions             */
  /*---------------------------------------------------*/

  patchProfileAvatar(link) {
    //console.log("patchProfileAvatar link:", link);
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status} + ${res.message}`);
      })
      .then((result) => {
        // this.handleSubmitButton();
        // this.handleAvatarChange(result.avatar);
        // console.log("patchProfile result:", result);
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /*---------------------------------------------------*/
  /*             Profile Api functions                 */
  /*---------------------------------------------------*/
  getProfile() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        // console.log("getProfile result:", result);
        // this._avatarElement.src = result.avatar;
        // this._nameElement.textContent = result.name;
        // this._bioElement.textContent = result.about;
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  patchProfile(nameVar, bioVar) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameVar,
        about: bioVar,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        // console.log("patchProfile result:", result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /*---------------------------------------------------*/
  /*             Card Api functions                    */
  /*---------------------------------------------------*/
  getCards() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        // console.log(result);
        // Eliminate any apparent duplication by checking unique name
        // Filter unique card name ensuring no-duplication occurs
        // const extraCards = new Set();
        const uniqueCardIds = new Set();
        ///////////////////////////////////////////////////////////////////////////////
        const uniqueCards = result.filter(({ name }) => {
          if (!uniqueCardIds.has(name)) {
            uniqueCardIds.add(name);
            return true;
          }
          return false;
        });
        return uniqueCards;
        ////////////////////////////////////////////////////////////////////////////////
        // deletes the cards but once you reload the page they all pop up again with new ids
        // result.forEach((card) => {
        //   this.deleteCard(card._id);
        // });
      })
      .catch((err) => {
        console.error("GET Card Error:", err);
      });
  }

  postCards(card) {
    return fetch(this._baseUrl, {
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        // this.handleSubmitButton();
        // this._tempCardElement.push({
        //   name: result.name,
        //   id: result._id,
        //   isLiked: false,
        // });
        // this.renderCard(result);
        // console.log(result);
        return result;
      })
      .catch((err) => {
        console.error("POST Card Error:", err);
      });
  }

  putCardLike(ID) {
    return fetch(this._baseUrl + `/${ID}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        // likeButton.classList.add("card__button-like_active");
        // // finds and updates object
        // const elem = this._tempCardElement.find(
        //   ({ name }) => name === cardTitle.textContent
        // );
        // if (elem) elem.isLiked = true;
        //console.log(result);
        return result;
      })
      .catch((err) => {
        console.error("PUT Like Error:", err);
      });
  }

  deleteCardLike(cardTitle, likeButton) {
    const ID = this.getID(cardTitle);
    return fetch(this._baseUrl + `/${ID}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        // likeButton.classList.remove("card__button-like_active");
        // const elem = this._tempCardElement.find(
        //   ({ name }) => name === cardTitle.textContent
        // );
        // if (elem) elem.isLiked = false;
        console.log(result);
      })
      .catch((err) => {
        console.error("DELETE Like Error:", err);
      });
  }

  deleteCard(cardID) {
    //const ID = this.getID(cardTitle);
    return fetch(this._baseUrl + `/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        // this.handleSubmitButton();
        // cardElement.remove();
        // cardElement = null;
        console.log(result);
      })
      .catch((err) => {
        console.error("DELETE Card Error:", err);
      });
  }

  /*---------------------------------------------------*/
  /*          Card/Profile helper function             */
  /*---------------------------------------------------*/

  // open() {
  //   this._modalButtonContent.forEach((modal) => {
  //     if (modal.name === this._currentModal.id) {
  //       const formSubmitButton =
  //         this._currentModal.querySelector(".modal__button");
  //       formSubmitButton.textContent = modal.buttonText;
  //     }
  //   });
  //   this._currentModal.classList.add("modal_opened");
  //   document.addEventListener("click", this._handleOverlayClick, true);
  //   document.addEventListener("keydown", this._handleDocumentKeydown, false);
  // }

  // close() {
  //   this._currentModal.classList.remove("modal_opened");
  //   document.removeEventListener("click", this._handleOverlayClick, true);
  //   document.removeEventListener("keydown", this._handleDocumentKeydown, false);
  // }

  // setCurrentModal(selector) {
  //   this._currentModal = selector;
  // }

  // setSubmitButtonContentBack() {
  //   const formSubmitButton = this._currentModal.querySelector(".modal__button");
  //   formSubmitButton.textContent = this.originalButtonContent;
  // }

  // handleSubmitButton() {
  //   const formSubmitButton = this._currentModal.querySelector(".modal__button");
  //   this._modalButtonContent.push({
  //     name: this._currentModal.id,
  //     buttonText: formSubmitButton.textContent,
  //   });
  //   formSubmitButton.textContent = "Saving . . .";
  // }

  /*---------------------------------------------------*/
  /*           Profile Pic helper function             */
  /*---------------------------------------------------*/

  // MOVED to PopupWithForm.js!
  // setEventListeners(selector) {
  //   const profileAvatarModal = document.querySelector("#profile-modal");
  //   const profileAvatarCloseButton =
  //     profileAvatarModal.querySelector(".modal__close");

  //   selector.addEventListener("click", () => {
  //     this._currentModal = profileAvatarModal;
  //     this.open();
  //   });
  //   profileAvatarCloseButton.addEventListener("click", () => {
  //     this.close();
  //   });
  // }

  // MOVED to PopupWithForm.js!
  // handleAvatarChange(link) {
  //   const avatarPic = document.querySelector("#profile__avatar-pic");
  //   avatarPic.src = link;
  // }

  /*---------------------------------------------------*/
  /*         Profile Info helper functions             */
  /*---------------------------------------------------*/

  // setProfileInfo({ name, bio }) {
  //   this._name = name;
  //   this._bio = bio;
  // }

  // getProfileInfo() {
  //   const userInfo = {
  //     name: this._nameElement.textContent,
  //     bio: this._bioElement.textContent,
  //   };

  //   return userInfo;
  // }

  /*---------------------------------------------------*/
  /*             Card helper functions                 */
  /*---------------------------------------------------*/

  // renderCard(card) {
  //   const cardElement = this._createCardElement(card); // Updated card creating
  //   this.addItem(cardElement); // Ensure add individual item
  // }

  // getID(element) {
  //   let cardID;
  //   this._tempCardElement.forEach((card) => {
  //     if (card.name === element.textContent) {
  //       cardID = card.id;
  //     }
  //   });
  //   return cardID;
  // }

  // toggleLike(cardTitle, likeButton) {
  //   finds and returns index
  //   let index = this._isLiked.findIndex((x) => x.name === cardTitle);
  //   console.log(index);

  //   this._tempCardElement.forEach((card) => {
  //     if (card.name === cardTitle.textContent && card.isLiked) {
  //       this.deleteCardLike(cardTitle, likeButton);
  //     }
  //     if (card.name === cardTitle.textContent && !card.isLiked) {
  //       this.putCardLike(cardTitle, likeButton);
  //     }
  //   });
  // }

  // takes a DOM element and adds it to the container. This method
  // should be called when adding an individual card to the DOM
  // addItem(element) {
  //   this.container.prepend(element);
  // }

  // Preview Image Function
  // handleImageClick({ name, link }) {
  //   this._popupPreviewImage =
  //     this.previewElement.querySelector(`#preview-modal-image`);
  //   this._popupPreviewCaption =
  //     this.previewElement.querySelector(`#preview-modal-title`);

  //   this._popupPreviewImage.src = link;
  //   this._popupPreviewImage.alt = name;

  //   this._popupPreviewCaption.textContent = name;

  //   this._currentModal = this.previewElement;
  //   this.open();
  // }

  // handleTrashModal(title, element) {
  //   const trashModal = document.querySelector("#trash-modal");
  //   const trashCloseButton = trashModal.querySelector(".modal__close");
  //   const trashSubmitButton = trashModal.querySelector(".modal__button-trash");

  //   this._currentModal = trashModal;
  //   this.open();

  //   trashCloseButton.addEventListener("click", () => {
  //     this.close();
  //   });

  //   trashSubmitButton.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     this.deleteCard(title, element);
  //     this.close();
  //   });
  // }

  // Create/ensure accurate element properties
  // _createCardElement({ name, link }) {
  //   const cardElement = this.cardElement.cloneNode(true); // Clone template
  //   const cardImage = cardElement.querySelector(".card__image");
  //   const cardTitle = cardElement.querySelector(".card__title");
  //   const likeButton = cardElement.querySelector(".card__button-like");
  //   const trashButton = cardElement.querySelector(".card__button-trash");

  //   cardImage.src = link;
  //   cardImage.alt = name;
  //   cardTitle.textContent = name;

  //   cardImage.addEventListener("click", () => {
  //     this.handleImageClick({ name, link });
  //   });

  //   likeButton.addEventListener("click", () => {
  //     this.toggleLike(cardTitle, likeButton);
  //   });

  //   trashButton.addEventListener("click", () => {
  //     this.handleTrashModal(cardTitle, cardElement);
  //   });

  //   return cardElement;
  // }

  // _handleEscClose(e) {
  //   if (e.key === "Escape") {
  //     this.close();
  //   }
  // }

  // _handleOverlay(evt) {
  //   if (evt.target.id === this._currentModal.id) {
  //     this.close();
  //   }
  // }
}
