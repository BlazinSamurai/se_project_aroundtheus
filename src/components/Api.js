export default class Api {
  constructor({ baseUrl, headers }) {
    // baseUrl: "https://around-api.en.tripleten-services.com/v1"
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status} + ${res.message}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  /*---------------------------------------------------*/
  /*         Profile Picture Api functions             */
  /*---------------------------------------------------*/

  // – Update avatar
  // PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
  patchProfileAvatar(link) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  /*---------------------------------------------------*/
  /*             Profile Api functions                 */
  /*---------------------------------------------------*/

  // – Get the current user’s info
  // GET https://around-api.en.tripleten-services.com/v1/users/me
  getProfile() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  // – Update your profile information
  // PATCH https://around-api.en.tripleten-services.com/v1/users/me
  patchProfile(nameVar, bioVar) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameVar,
        about: bioVar,
      }),
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
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((result) => {
        return result;
      });
  }

  // – Create a card
  // POST https://around-api.en.tripleten-services.com/v1/cards
  postCards(card) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then(this._checkResponse)
      .then((result) => {
        return result;
      });
  }

  // – Like a card
  // PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  putCardLike(ID) {
    return fetch(this._baseUrl + `/cards/${ID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // – Dislike a card
  // DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  deleteCardLike(ID) {
    return fetch(this._baseUrl + `/cards/${ID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // – Delete a card
  // DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
  deleteCard(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((result) => {
        console.log(result);
      });
  }
}
