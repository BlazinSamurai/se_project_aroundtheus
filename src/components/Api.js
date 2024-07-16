// token: c430f938-707d-41ce-9931-5e6195b9093a

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._name;
    this._bio;
  }
  getProfile() {
    fetch(this._baseUrl, {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          // return the method's result and call the then() callback.
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }
  patchProfile() {
    fetch(this._baseUrl, {
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
          // return the method's result and call the then() callback.
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }
  setProfileInfo({ name, bio }) {
    this._name = name;
    this._bio = bio;
    console.log(this._name);
    console.log(this._bio);
  }
}
