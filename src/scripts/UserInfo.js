export default class UserInfo {
  constructor(nameSelector, jobElement) {
    this._nameSelector = nameSelector;
    this._jobElement = jobElement;
  }

  // returns an object containing information about the
  // user. This method will be handy for cases when it's
  // necessary to display the user data in the open form
  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      job: this._jobElement.textContent,
    };

    return userInfo;
  }

  // setUserInfo() takes new user data and adds it
  // to the page. This method should be used after successful
  // submission of the profile form
  setUserInfo() {
    const newUserInfo = this.getUserInfo();
    this._nameSelector.textContent = newUserInfo.name;
    this._jobElement.textContent = newUserInfo.job;
  }
}
