export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    this.cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card__section")
      .cloneNode(true);

    this._nameElement = document.querySelector(".profile__name");
    this._bioElement = document.querySelector(".profile__bio");
    this.previewElement = document.querySelector("#preview-modal");

    // Ensure context binding for non-arrow non-promise specific case
    //this.handleCardOperations = this.handleCardOperations.bind(this);

    // Define the event handlers separately
    this._handleOverlayClick = (e) => this._handleOverlay(e);
    this._handleDocumentKeydown = (e) => this._handleEscClose(e);

    this.container = document.querySelector(".card__list");

    this._cardsID = [];
    this._isLiked = [];

    this.originalButtonContent;
    this._currentModal;
    this._name;
    this._bio;
  }

  /*---------------------------------------------------*/
  /*         Profile Picture Api functions             */
  /*---------------------------------------------------*/

  patchProfileAvatar(link) {
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
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        this.handleSubmitButton();
        this.handleAvatarChange(result.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /*---------------------------------------------------*/
  /*             Profile Api functions                 */
  /*---------------------------------------------------*/
  getProfile() {
    fetch(this._baseUrl, {
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
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  patchProfile() {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._name,
        about: this._bio,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        this.handleSubmitButton();
        return result;
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
        console.log("Fetched Cards:", result); // Guarantee each card tracked

        // Eliminate any apparent duplication by checking unique IDs
        // Filter unique card IDs ensuring no-duplication occurs
        const uniqueCardIds = new Set();
        const uniqueCards = result.filter(({ _id }) => {
          if (!uniqueCardIds.has(_id)) {
            uniqueCardIds.add(_id);
            return true;
          }
          return false;
        });

        console.log("Unique Cards:", uniqueCards); // Verify post-filter condition

        this.renderCard(uniqueCards); // Call render only on distinct cards
      })
      .catch((err) => {
        console.error(err);
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
        this.handleSubmitButton();
        this._cardsID.push({ name: result.name, id: result._id });
        this.renderCard(result);
      })
      .catch((err) => {
        console.error("Post Error:", err);
      });
  }

  putCardLike(cardTitle, likeButton) {
    const ID = this.getID(cardTitle);
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
        likeButton.classList.add("card__button-like_active");
        // finds and updates object
        const elem = this._isLiked.find(
          ({ name }) => name === cardTitle.textContent
        );
        if (elem) elem.isLiked = true;
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
      .then(() => {
        likeButton.classList.remove("card__button-like_active");
        const elem = this._isLiked.find(
          ({ name }) => name === cardTitle.textContent
        );
        if (elem) elem.isLiked = false;
      });
  }

  // deleteCard(cardTitle, cardElement) {
  //   const ID = this.getID(cardTitle);
  //   return fetch(this._baseUrl + `/${ID}/likes`, {
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
  //     .then(() => {
  //       cardElement.remove();
  //       cardElement = null;
  //     });
  // }

  /*---------------------------------------------------*/
  /*          Card/Profile helper function             */
  /*---------------------------------------------------*/

  open() {
    //console.log("Open Current Modal: ", this._currentModal);
    this._currentModal.classList.add("modal_opened");
    document.addEventListener("click", this._handleOverlayClick, true);
    document.addEventListener("keydown", this._handleDocumentKeydown, false);
  }

  close() {
    this._currentModal.classList.remove("modal_opened");
    document.removeEventListener("click", this._handleOverlayClick, true);
    document.removeEventListener("keydown", this._handleDocumentKeydown, false);
  }

  setCurrentModal(selector) {
    this._currentModal = selector;
    //console.log("Set Current Modal: ", this._currentModal);
  }

  setSubmitButtonContentBack() {
    const formSubmitButton = this._currentModal.querySelector(".modal__button");
    formSubmitButton.textContent = this.originalButtonContent;
  }

  handleSubmitButton() {
    const formSubmitButton = this._currentModal.querySelector(".modal__button");
    this.originalButtonContent = formSubmitButton.textContent;
    formSubmitButton.textContent = "Saving . . .";
  }

  /*---------------------------------------------------*/
  /*      Profile Edit Pic Api helper function         */
  /*---------------------------------------------------*/

  setEventListeners(selector) {
    const profileAvatarModal = document.querySelector("#profile-modal");
    const profileAvatarCloseButton =
      profileAvatarModal.querySelector(".modal__close");

    selector.addEventListener("click", () => {
      this._currentModal = profileAvatarModal;
      this.open();
    });
    profileAvatarCloseButton.addEventListener("click", () => {
      this.close();
    });
  }

  handleAvatarChange(link) {
    const avatarPic = document.querySelector("#profile__avatar-pic");
    avatarPic.src = link;
  }

  /*---------------------------------------------------*/
  /*         Profile Api helper functions              */
  /*---------------------------------------------------*/

  setProfileInfo({ name, bio }) {
    this._name = name;
    this._bio = bio;
  }

  getProfileInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
    };

    return userInfo;
  }

  /*---------------------------------------------------*/
  /*         Card Api helper functions                 */
  /*---------------------------------------------------*/

  renderCard(cards) {
    cards.forEach((card) => {
      const cardElement = this._createCardElement(card); // Updated card creating
      console.log("Render API Card:", cardElement); // Verify each card rendered accurately
      this.addItem(cardElement); // Ensure add individual item
    });
  }

  getID(element) {
    let cardID;
    this._cardsID.forEach((card) => {
      if (card.name === element.textContent) {
        cardID = card.id;
      }
    });
    return cardID;
  }

  toggleLike(cardTitle, likeButton) {
    // finds and returns index
    // let index = this._isLiked.findIndex((x) => x.name === cardTitle);
    // console.log(index);

    this._isLiked.forEach((card) => {
      if (card.name === cardTitle.textContent && card.isLiked) {
        this.deleteCardLike(cardTitle, likeButton);
      }
      if (card.name === cardTitle.textContent && !card.isLiked) {
        this.putCardLike(cardTitle, likeButton);
      }
    });
  }

  // takes a DOM element and adds it to the container. This method
  // should be called when adding an individual card to the DOM
  addItem(element) {
    this.container.prepend(element);
  }

  // Preview Image Function
  handleImageClick({ name, link }) {
    this._popupPreviewImage =
      this.previewElement.querySelector(`#preview-modal-image`);
    this._popupPreviewCaption =
      this.previewElement.querySelector(`#preview-modal-title`);

    this._popupPreviewImage.src = link;
    this._popupPreviewImage.alt = name;

    this._popupPreviewCaption.textContent = name;

    this._currentModal = this.previewElement;
    this.open();
  }

  handleTrashModal(title, element) {
    const trashModal = document.querySelector("#trash-modal");
    const trashCloseButton = trashModal.querySelector(".modal__close");
    const trashSubmitButton = trashModal.querySelector(".modal__button-trash");

    this._currentModal = trashModal;
    this.open();

    trashCloseButton.addEventListener("click", () => {
      this.close();
    });

    trashSubmitButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.deleteCard(title, element);
      this.close();
    });
  }

  // Create/ensure accurate element properties
  _createCardElement({ name, link }) {
    const cardElement = this.cardElement.cloneNode(true); // Clone template
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__button-like");
    const trashButton = cardElement.querySelector(".card__button-trash");

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    this._isLiked.push({ name: name, isLiked: false });

    cardImage.addEventListener("click", () => {
      this.handleImageClick({ name, link });
    });

    likeButton.addEventListener("click", () => {
      this.toggleLike(cardTitle, likeButton);
    });

    trashButton.addEventListener("click", () => {
      this.handleTrashModal(cardTitle, cardElement);
    });

    return cardElement;
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.id === this._currentModal.id) {
      this.close();
    }
  }
  //////////////////////////////////////////////////////////////////
  // handleCardOperations() {
  //   // Ensure promise chain is available
  //   this.getCards()
  //     .then(() => {
  //       // Correct sequence handling
  //       this.returnArray();
  //     })
  //     .then(() => {
  //       this.deleteCards();
  //     });
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
  //     .then((result) => {
  //       //this.renderCard(result);
  //       console.log(result);
  //       // Log the complete cards array
  //       // console.log("Fetched cards:", result);
  //       // Spread the array items into this._cardsID
  //       this._cardsID.push(...result.map((card) => card._id));
  //       // Verify IDs are correctly logged
  //       // console.log("Card IDs:", this._cardsID);
  //       //this.renderCard(result);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // returnArray() {
  //   // console.log("Array Check:", this._cardsID); // Note an ensured invocation log
  //   console.log(Array.isArray(this._cardsID)); // Should log true
  //   // console.log("Card IDs length:", this._cardsID.length); // Should log count
  // }

  // deleteCards() {
  //   this._cardsID.forEach((ID) => {
  //     fetch(this._baseUrl + `/${ID}`, {
  //       method: "DELETE",
  //       headers: {
  //         authorization: this._headers.authorization,
  //       },
  //     })
  //       .then((res) => {
  //         if (res.ok) return res.json();
  //         return Promise.reject(`Error: ${res.status}`);
  //       })
  //       .then((result) => {
  //         console.log(result);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   });
  // }
}
