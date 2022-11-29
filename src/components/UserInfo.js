export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      'user-name': this._userName.textContent,
      'user-about': this._userAbout.textContent,
      'user-avatar': this._userAvatar.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }
}
