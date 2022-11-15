import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__photo');
    this._popupNameValue = this._popup.querySelector('.popup__photo-name');
  }

  open(link, name) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupNameValue.textContent = name;
  }
}
