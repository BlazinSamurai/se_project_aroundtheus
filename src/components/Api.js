// token: c430f938-707d-41ce-9931-5e6195b9093a

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    // Ensure context binding for non-arrow non-promise specific case
    this.handleCardOperations = this.handleCardOperations.bind(this);

    this.cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card__section")
      .cloneNode(true);
    this._nameElement = document.querySelector(".profile__name");
    this._bioElement = document.querySelector(".profile__bio");

    //#preview-modal #preview-modal-image #preview-modal-title
    this.previewElement = document.querySelector("#preview-modal");

    // Define the event handlers separately
    this._handleOverlayClick = (e) => this._handleOverlay(e);
    this._handleDocumentKeydown = (e) => this._handleEscClose(e);

    this.container = document.querySelector(".card__list");

    this._cardsID = [];

    this._name;
    this._bio;
  }

  // Profile API functions
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

  // Cards Api functions
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
        // this.returnResult(result); this returns a promise
        // Ensure clean logging statements handle debug
        // console.log("Post Results:", result); but this returns an object?????????
        // Properly add individual card

        this.renderCard(result);
        // return result; returns a promise
      })
      .catch((err) => {
        console.error("Post Error:", err);
      });
  }

  renderCard(data) {
    // console.log("Data coming in: ", data);
    const cardElement = this._createCardElement(data); // Updated card creating
    // console.log("Card element:", cardElement);
    this.addItem(cardElement); // Ensure add individual items
  }

  // Create/ensure accurate element properties
  _createCardElement({ name, link }) {
    const cardElement = this.cardElement.cloneNode(true); // Clone template
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardImage.addEventListener("click", () => {
      // console.log("Clicked Image: ", cardElement);
      this.handleImageClick({ name, link });
    });

    return cardElement;
  }

  // takes a DOM element and adds it to the container. This method
  // should be called when adding an individual card to the DOM
  addItem(element) {
    // console.log("API this:", this); // Verify 'this' context
    // console.log("API card BEFORE prepend:", element); // Verify individual card item
    this.container.prepend(element);
  }

  handleImageClick({ name, link }) {
    // console.log("handleImageClick link: ", link);
    //this.previewElement
    // set the image's src and alt

    this._popupPreviewImage =
      this.previewElement.querySelector(`#preview-modal-image`);
    this._popupPreviewCaption =
      this.previewElement.querySelector(`#preview-modal-title`);

    this._popupPreviewImage.src = link;
    this._popupPreviewImage.alt = name;

    // set the caption's textContent
    this._popupPreviewCaption.textContent = name;

    // console.log("handleImageClick previewElement: ", this.previewElement);
    // this.previewElement.classList.add("modal_opened");
    this.open();
  }

  open() {
    this.previewElement.classList.add("modal_opened");
    document.addEventListener("click", this._handleOverlayClick, true);
    document.addEventListener("keydown", this._handleDocumentKeydown, false);
  }

  close() {
    this.previewElement.classList.remove("modal_opened");
    document.removeEventListener("click", this._handleOverlayClick, true);
    document.removeEventListener("keydown", this._handleDocumentKeydown, false);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.id === this.previewElement.id) {
      this.close();
    }
  }

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
        // Ensure clean logging statements handle debug
        // console.log("Post Results:", result);
        // Properly add individual card
        this.renderCard(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  ////////////////////////////////////////////////////////////////////////////////

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

  handleCardOperations() {
    // Ensure promise chain is available
    this.getCards()
      .then(() => {
        // Correct sequence handling
        this.returnArray();
      })
      .then(() => {
        this.deleteCards();
      });
  }

  returnArray() {
    // console.log("Array Check:", this._cardsID); // Note an ensured invocation log
    console.log(Array.isArray(this._cardsID)); // Should log true
    // console.log("Card IDs length:", this._cardsID.length); // Should log count
  }

  deleteCards() {
    this._cardsID.forEach((ID) => {
      fetch(this._baseUrl + `/${ID}`, {
        method: "DELETE",
        headers: {
          authorization: this._headers.authorization,
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
  /////////////////////////////////////////////////////////////////////////////////
}
