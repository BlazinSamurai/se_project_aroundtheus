export default class UserInfo {
  constructor(nameSelector, bioSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
    this._avatarSelector = avatarSelector;

    this._nameElement = document.querySelector(this._nameSelector);
    this._bioElement = document.querySelector(this._bioSelector);
    this._avatarElement = document.querySelector(this._avatarSelector);
  }

  setAvatarPic(link) {
    this._avatarElement.src = link;
  }

  // returns an object containing information about the
  // user. This method will be handy for cases when it's
  // necessary to display the user data in the open form
  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
      avatar: this._avatarElement.src,
    };

    return userInfo;
  }

  // setUserInfo() takes new user data and adds it
  // to the page. This method should be used after successful
  // submission of the profile form
  setUserInfo(newName, newBio, newAvatar) {
    this._nameElement.textContent = newName;
    this._bioElement.textContent = newBio;
    this._avatarElement.src = newAvatar;
  }
}
