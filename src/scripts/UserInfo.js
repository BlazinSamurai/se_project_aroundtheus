export default class UserInfo {
  constructor(nameSelector, jobElement) {
    this._nameSelector = nameSelector;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      job: this._jobElement.textContent,
    };

    // console.log(userInfo);
    return userInfo;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobElement.textContent = data.job;
  }
}
