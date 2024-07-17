// token: c430f938-707d-41ce-9931-5e6195b9093a

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    this.cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card__section")
      .cloneNode(true);
    this._cardImage = this.cardElement.querySelector(".card__image");
    this._cardTitle = this.cardElement.querySelector(".card__title");

    this.container = document.querySelector(".card__list");

    this._name;
    this._bio;

    this._cardsID = [];
  }

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
    const newProfileInfo = {
      name: this._name,
      bio: this._bio,
    };
    return newProfileInfo;
  }

  postCards(cards) {
    cards.forEach((card) => {
      return fetch(this._baseUrl, {
        method: "Post",
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
        .catch((err) => {
          console.error(err);
        });
    });
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
      .then((results) => {
        results.forEach((result) => {
          console.log(result);
          this._cardsID.push(result._id);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCards() {
    //IDs.forEach((ID) => {
    //console.log(this._baseUrl + ID);
    return fetch(this._baseUrl, {
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
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.error(err);
      });
    //});
  }
}
