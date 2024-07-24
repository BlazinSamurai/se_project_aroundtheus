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

    this._currentModal;
    this._name;
    this._bio;
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
        // return the method's result and call the then() callback.
        if (res.ok) return res.json();
        // if the server returns an error, reject the promise
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
        this.renderCard(result);
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

  deleteCard(cardTitle, cardElement) {
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
        cardElement.remove();
        cardElement = null;
      });
  }

  /*---------------------------------------------------*/
  /*      Profile Api helper functions                 */
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

  renderCard(data) {
    const cardElement = this._createCardElement(data); // Updated card creating
    this.addItem(cardElement); // Ensure add individual items
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

  open() {
    this._currentModal.classList.add("modal_opened");
    document.addEventListener("click", this._handleOverlayClick, true);
    document.addEventListener("keydown", this._handleDocumentKeydown, false);
  }

  close() {
    this._currentModal.classList.remove("modal_opened");
    document.removeEventListener("click", this._handleOverlayClick, true);
    document.removeEventListener("keydown", this._handleDocumentKeydown, false);
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

  ////////////////////////////////////////////////////////////////////////////////
  // OLD BUT GOOD TOGGLELIKE FUNCTION!!!!!!!!!!!!!!!
  // console.log("Passed value.textContent: ", cardTitle.textContent); ACTUAL VALUE!!!!
  // if (this._isLiked.length === 0) {
  //   console.log("first click.");
  //   this._isLiked.push({ name: cardTitle.textContent, isLiked: true });
  //   console.log(this._isLiked);
  // } else {
  //   this._isLiked.forEach((card) => {
  //     if (card.name === cardTitle.textContent && card.isLiked) {
  //       console.log("Should unlike.");
  //     }
  //     if (card.name === cardTitle.textContent && !card.isLiked) {
  //       console.log("Should like");
  //       this._isLiked.push({ name: cardTitle, isLiked: true });
  //     }
  //     else {
  //       console.error("ERROR! Card not avaliable.");
  //       console.error(
  //         "Title: ",
  //         cardTitle.textContent,
  //         " != Name: ",
  //         card.name
  //       );
  //     }
  //   });
  // }

  // handleHeartClick(cardTitle, likeButton, isLiked) {
  //   likeButton.addEventListener("click", () => {
  //     if (isLiked) {
  //       //console.log("Needs to be UNLIKED!");
  //       this.deleteCardLike(cardTitle, likeButton);
  //     } else {
  //       //console.log(data, " Unliked. Button: ", likeButton);
  //       this.putCardLike(cardTitle, likeButton);
  //     }
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
  //     .then((result) => {
  //       // console.log(result);
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

  // returnArray() {
  //   // console.log("Array Check:", this._cardsID); // Note an ensured invocation log
  //   console.log(Array.isArray(this._cardsID)); // Should log true
  //   // console.log("Card IDs length:", this._cardsID.length); // Should log count
  // }

  /////////////////////////////////////////////////////////////////////////////////
}
