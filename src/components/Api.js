export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
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
        const uniqueCardIds = new Set();
        const uniqueCards = result.filter(({ name }) => {
          if (!uniqueCardIds.has(name)) {
            uniqueCardIds.add(name);
            return true;
          }
          return false;
        });
        return uniqueCards;
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
        return result;
      })
      .catch((err) => {
        console.error("PUT Like Error:", err);
      });
  }

  deleteCardLike(cardTitle) {
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
        console.log(result);
      })
      .catch((err) => {
        console.error("DELETE Like Error:", err);
      });
  }

  deleteCard(cardID) {
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
        console.log(result);
      })
      .catch((err) => {
        console.error("DELETE Card Error:", err);
      });
  }
}
