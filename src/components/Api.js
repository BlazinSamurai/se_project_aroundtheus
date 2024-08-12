export default class Api {
  constructor({ baseUrl, headers }) {
    // baseUrl: "https://around-api.en.tripleten-services.com/v1"
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /*---------------------------------------------------*/
  /*         Profile Picture Api functions             */
  /*---------------------------------------------------*/

  // – Update avatar
  // PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
  patchProfileAvatar(link) {
    return fetch(this._baseUrl + "/users/me/avatar", {
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
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /*---------------------------------------------------*/
  /*             Profile Api functions                 */
  /*---------------------------------------------------*/

  // – Get the current user’s info
  // GET https://around-api.en.tripleten-services.com/v1/users/me
  getProfile() {
    return fetch(this._baseUrl + "/users/me", {
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
        //console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // – Update your profile information
  // PATCH https://around-api.en.tripleten-services.com/v1/users/me
  patchProfile(nameVar, bioVar) {
    return fetch(this._baseUrl + "/users/me", {
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
      .catch((err) => {
        console.error(err);
      });
  }

  /*---------------------------------------------------*/
  /*             Card Api functions                    */
  /*---------------------------------------------------*/
  // – Get all cards
  // GET https://around-api.en.tripleten-services.com/v1/cards
  getCards() {
    return fetch(this._baseUrl + "/cards", {
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
        const uniqueCardIds = new Set();
        const uniqueCards = result.filter(({ name }) => {
          if (!uniqueCardIds.has(name)) {
            uniqueCardIds.add(name);
            return true;
          }
          return false;
        });
        // console.log(uniqueCards.length);
        return uniqueCards;

        // result.forEach((card) => {
        //   //console.log(card._id);
        //   this.deleteCard(card._id);
        // });
      })
      .catch((err) => {
        console.error("GET Card Error:", err);
      });
  }

  // – Create a card
  // POST https://around-api.en.tripleten-services.com/v1/cards
  postCards(card) {
    return fetch(this._baseUrl + "/cards", {
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
        return result;
      })
      .catch((err) => {
        console.error("POST Card Error:", err);
      });
  }

  // – Like a card
  // PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  putCardLike(ID) {
    return fetch(this._baseUrl + `cards/${ID}/likes`, {
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
        return result;
      })
      .catch((err) => {
        console.error("PUT Like Error:", err);
      });
  }

  // – Dislike a card
  // DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  deleteCardLike(cardTitle) {
    return fetch(this._baseUrl + `cards/${ID}/likes`, {
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
        console.log(result);
      })
      .catch((err) => {
        console.error("DELETE Like Error:", err);
      });
  }

  // – Delete a card
  // DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
  deleteCard(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
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
        console.log(result);
      });
    // .catch((err) => {
    //   console.error("DELETE Card Error:", err);
    // });
  }
}
