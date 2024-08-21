export default class UserInfo {
  constructor(nameSelector, bioSelector) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;

    this._nameElement = document.querySelector(this._nameSelector);
    this._bioElement = document.querySelector(this._bioSelector);
  }

  setAvatarPic(element, link) {
    element.src = link;
  }

  // returns an object containing information about the
  // user. This method will be handy for cases when it's
  // necessary to display the user data in the open form
  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
    };

    return userInfo;
  }

  // setUserInfo() takes new user data and adds it
  // to the page. This method should be used after successful
  // submission of the profile form
  setUserInfo(newName, newBio) {
    this._nameElement.textContent = newName;
    this._bioElement.textContent = newBio;
  }
}
