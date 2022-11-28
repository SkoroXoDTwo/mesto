export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      'user-name': this._userName.textContent,
      'user-about': this._userAbout.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}
